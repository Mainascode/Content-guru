
from xhtml2pdf import pisa
from io import BytesIO
from flask import render_template

def generate_pdf_receipt(template_name, context):
    html = render_template(template_name, **context)
    pdf = BytesIO()
    pisa_status = pisa.CreatePDF(html, dest=pdf)

    if pisa_status.err:
        return None
    pdf.seek(0)
    return pdf