from math import ulp
from flask import Flask, request, jsonify
from flask_cors import CORS
from urllib.parse import quote as url_quote
import PyPDF2
import io
import re
import json
import os

# Additional imports for enhanced matching
from rapidfuzz import process, fuzz
# import spacy

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load spaCy model for basic phrase detection
# nlp = spacy.load("en_core_web_sm")

# Load skills database
SKILLS = {
    "Programming": [
        "JavaScript", "Python", "Java", "C++", "C#", "PHP", "Ruby", "Swift",
        "TypeScript", "GoLang", "Rust", "HTML", "CSS", "React", "Angular",
        "Vue", "Node.js", "Express", "Django", "Flask", "Spring", "Hibernate",
        "SQL", "MongoDB", "PostgreSQL", "MySQL"
    ],
    "Tool": [
        "Git", "Docker", "Kubernetes", "AWS", "Azure", "GCP", "Jira", "Confluence",
        "Jenkins", "CircleCI", "TravisCI", "Webpack", "Babel", "npm", "Yarn",
        "Maven", "Gradle", "Terraform", "Ansible", "Photoshop", "Illustrator",
        "Figma", "Sketch"
    ],
    "Soft Skill": [
        "communication", "teamwork", "leadership", "problem solving", "critical thinking",
        "time management", "adaptability", "creativity", "attention to detail",
        "organization", "interpersonal", "presentation", "negotiation", "conflict resolution",
        "customer service", "project management"
    ],
    "Language": [
        "English", "Spanish", "French", "German", "Chinese", "Japanese", "Russian",
        "Arabic", "Portuguese", "Italian", "Dutch", "Korean", "Hindi"
    ],
    "Certification": [
        "AWS Certified", "Microsoft Certified", "Cisco Certified", "CompTIA", "PMP",
        "Scrum Master", "Six Sigma", "ITIL", "CEH", "CISSP", "CISM", "CISA",
        "Google Certified", "Oracle Certified"
    ]
}

# Pre-flattened list of all skills for fuzzy matching
ALL_SKILLS = [skill for skills in SKILLS.values() for skill in skills]

# Configuration: fuzzy threshold and max results per input
FUZZY_THRESHOLD = 80  # percent similarity
MAX_MATCHES = 3


def extract_text_from_pdf(pdf_file):
    """Extract text content from PDF file"""
    pdf_reader = PyPDF2.PdfReader(pdf_file)
    text = ""
    for page in pdf_reader.pages:
        text += page.extract_text() or ""
    return text


def extract_text_from_txt(txt_file):
    """Extract text content from TXT file"""
    return txt_file.read().decode('utf-8')


def identify_skills(text):
    """Identify skills using fuzzy matching, exact matches, and phrase detection"""
    doc = ulp(text)
    found = {}

    # 1. Exact regex matches (case-insensitive whole words)
    lowered = text.lower()
    for category, skills in SKILLS.items():
        for skill in skills:
            pattern = r'\\b' + re.escape(skill.lower()) + r'\\b'
            count = len(re.findall(pattern, lowered))
            if count:
                score = min(0.6 + 0.1 * count, 0.95)
                found[skill] = {"category": category, "confidence": score, "matched_via": "exact"}

    # 2. Fuzzy matching against entire skill list
    # Only fuzzy-match input if not already exact-found
    for match, score, _ in process.extract(text, ALL_SKILLS, scorer=fuzz.token_sort_ratio, limit=len(ALL_SKILLS)):
        if score >= FUZZY_THRESHOLD and match not in found:
            # Map match back to category
            for cat, skills in SKILLS.items():
                if match in skills:
                    conf = 0.4 + (score / 100) * 0.5  # scale fuzzy score to confidence [0.4,0.9]
                    found[match] = {"category": cat, "confidence": round(min(conf, 0.95), 2), "matched_via": "fuzzy"}
                    break

    # 3. Phrase detection: detect noun chunks for multi-word skills not in SKILLS
    for chunk in doc.noun_chunks:
        phrase = chunk.text.strip().lower()
        # e.g. 'machine learning', 'data analysis'
        if phrase not in [s.lower() for s in ALL_SKILLS] and len(phrase.split()) > 1:
            # simple heuristic: mark as soft skill
            found[phrase] = {"category": "Soft Skill", "confidence": 0.5, "matched_via": "phrase"}

    # Prepare output list
    output = []
    for name, info in found.items():
        output.append({
            "name": name.title(),
            "category": info['category'],
            "confidence": info['confidence'],
            "matched_via": info['matched_via']
        })

    # Sort by confidence descending
    output.sort(key=lambda x: x['confidence'], reverse=True)
    return output

@app.route('/extract-skills', methods=['POST'])
def extract_skills():
    """API endpoint to extract skills from resume"""
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    try:
        if file.filename.lower().endswith('.pdf'):
            text = extract_text_from_pdf(file)
        elif file.filename.lower().endswith('.txt'):
            text = extract_text_from_txt(file)
        else:
            return jsonify({"error": "Unsupported file format"}), 400

        skills = identify_skills(text)
        return jsonify({"skills": skills})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
