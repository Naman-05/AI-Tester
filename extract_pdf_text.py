from pathlib import Path
import PyPDF2

path = Path('Restful-booker.pdf')
reader = PyPDF2.PdfReader(path)
print('pages', len(reader.pages))
for i, page in enumerate(reader.pages[:5]):
    text = page.extract_text() or ''
    print(f'PAGE {i+1}')
    print(text[:2000])
    print('---')
