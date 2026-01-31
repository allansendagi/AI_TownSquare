#!/usr/bin/env python3
"""
AI TownSquare Resource Summarizer
Reads all PDF and DOCX files from the Resources.md directory
and outputs a structured summary of the platform context.
"""

import os
import zipfile
import xml.etree.ElementTree as ET
import json
from datetime import datetime


RESOURCES_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "Resources.md")


def read_docx(filepath):
    """Extract text content from a .docx file."""
    try:
        with zipfile.ZipFile(filepath) as z:
            xml_content = z.read("word/document.xml")
        tree = ET.fromstring(xml_content)
        ns = "http://schemas.openxmlformats.org/wordprocessingml/2006/main"
        paragraphs = []
        for p in tree.iter(f"{{{ns}}}p"):
            texts = [t.text for t in p.iter(f"{{{ns}}}t") if t.text]
            if texts:
                paragraphs.append("".join(texts))
        return "\n".join(paragraphs)
    except Exception as e:
        return f"[Error reading {filepath}: {e}]"


def read_pdf_text(filepath):
    """Attempt to extract text from a PDF using PyPDF2 or pdfplumber."""
    # Try PyPDF2 first
    try:
        from PyPDF2 import PdfReader
        reader = PdfReader(filepath)
        text = []
        for page in reader.pages:
            t = page.extract_text()
            if t:
                text.append(t)
        if text:
            return "\n\n".join(text)
    except ImportError:
        pass
    except Exception:
        pass

    # Try pdfplumber
    try:
        import pdfplumber
        with pdfplumber.open(filepath) as pdf:
            text = []
            for page in pdf.pages:
                t = page.extract_text()
                if t:
                    text.append(t)
        if text:
            return "\n\n".join(text)
    except ImportError:
        pass
    except Exception:
        pass

    return "[PDF extraction requires PyPDF2 or pdfplumber. Install with: pip install PyPDF2 pdfplumber]"


def summarize_content(filename, content):
    """Generate a structured summary for a document based on its content."""
    lines = content.strip().split("\n")
    non_empty = [l.strip() for l in lines if l.strip()]

    return {
        "filename": filename,
        "total_lines": len(lines),
        "total_characters": len(content),
        "preview": "\n".join(non_empty[:30]),  # First 30 non-empty lines
    }


def main():
    print("=" * 70)
    print("  AI TOWNSQUARE - RESOURCE DOCUMENT SUMMARY")
    print(f"  Generated: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print("=" * 70)
    print()

    if not os.path.isdir(RESOURCES_DIR):
        print(f"Error: Resources directory not found at {RESOURCES_DIR}")
        return

    files = sorted(os.listdir(RESOURCES_DIR))
    pdf_files = [f for f in files if f.lower().endswith(".pdf")]
    docx_files = [f for f in files if f.lower().endswith(".docx")]

    print(f"Found {len(pdf_files)} PDF files and {len(docx_files)} DOCX files\n")

    all_summaries = []

    # Process DOCX files (these we can always read)
    for filename in docx_files:
        filepath = os.path.join(RESOURCES_DIR, filename)
        print(f"--- Reading: {filename} ---")
        content = read_docx(filepath)
        summary = summarize_content(filename, content)
        all_summaries.append(summary)
        print(f"    Characters: {summary['total_characters']}")
        print(f"    Lines: {summary['total_lines']}")
        print()
        print("    Content Preview:")
        for line in summary["preview"].split("\n")[:15]:
            print(f"      {line}")
        print()

    # Process PDF files
    for filename in pdf_files:
        filepath = os.path.join(RESOURCES_DIR, filename)
        print(f"--- Reading: {filename} ---")
        content = read_pdf_text(filepath)
        summary = summarize_content(filename, content)
        all_summaries.append(summary)
        print(f"    Characters: {summary['total_characters']}")
        print(f"    Lines: {summary['total_lines']}")
        print()
        print("    Content Preview:")
        for line in summary["preview"].split("\n")[:15]:
            print(f"      {line}")
        print()

    # Output consolidated platform summary
    print("=" * 70)
    print("  CONSOLIDATED PLATFORM SUMMARY")
    print("=" * 70)
    print("""
WHAT IS AI TOWNSQUARE?
  AI TownSquare is civic infrastructure for the intelligence age.
  Mission: Bridge the gap between AI advancement and societal readiness.
  Format: A one-hour civic protocol — not a panel, pitch, or webinar.

THE FORMAT:
  - 60 minutes of structured, facilitated dialogue
  - 25 curated participants per session (cross-sector)
  - 7-phase protocol: Prime > Complicate > Position > Breakout > Shareback > Synthesize > Capture
  - Civic Insight Brief published within 48 hours
  - Rotating topics, rotating cities, consistent protocol

PARTICIPANT MIX:
  Builders (tech/AI/product), Users (business/operations),
  Regulators (policy/government), Academics (research/education),
  Citizens (general public)

THE CIVIC OPERATING SYSTEM:
  1. AI TownSquare (Dialogue) -> Generates civic data
  2. Societal Readiness Index (Diagnosis) -> Six-pillar benchmark
     - Governance (25%)
     - Citizen Empowerment (20%)
     - Ethics (20%)
     - Economic Adaptability (15%)
     - Infrastructure (10%)
     - Foresight (10%)
  3. Readiness Institute (Capability) -> Toolkits & training
  4. Readiness Gap Clock -> Tracks time since last verified improvement

YEAR 1 FOCUS AREAS:
  Healthcare, Finance & Banking, Government & Governance, Education

KEY ENDORSEMENTS:
  - Lord Darzi, Executive Chair, WISH: "I will advocate for this myself!"
  - Dr. Jagat Narula, EVP & Chief Academic Officer, UTHealth Houston:
    "Incredibly well done and needed."

TRACTION:
  - 150+ registered for Doha session (25 seats)
  - Global series in development

COMMERCIAL MODEL:
  - Premium civic intelligence platform (not just an event series)
  - Revenue: sponsorship, institutional partnerships, hosting rights, private briefings
  - Civic Insight Brief is a licensable commercial asset

CONTACT:
  - Domain: aitownsquare.org
  - Phone: +971 50968 8926 | +974 5017 6561

KEY QUOTES:
  "The protocol is the product."
  "You're not here to impress. You're here to clarify."
  "This isn't conversation for its own sake. It's a civic mechanism
   for turning dialogue into readiness."
""")

    print(f"\nTotal documents processed: {len(all_summaries)}")
    print("Summary complete.")


if __name__ == "__main__":
    main()
