import os

file_path = r'd:\dev\ANTIGRAVITY\PATRICK ASSO COUTURE\collection-urban.html'
target = '                <div class="gallery-item"><img src="images/collection/urban/urban_21.jpg" alt="Urban 21"></div>\n'

if os.path.exists(file_path):
    with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.readlines()
    
    new_content = [line for line in content if 'urban_21.jpg' not in line]
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.writelines(new_content)
    print("Success")
else:
    print("File not found")
