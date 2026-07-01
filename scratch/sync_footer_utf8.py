import os
import re

new_footer = """    <footer class="main-footer" id="contact">
        <div class="container">
            <div class="footer-grid">
                <div class="footer-brand">
                    <img src="images/logo/logo_patric_asso_transp.png" alt="Patrick ASSO" class="logo-small">
                    <p>L'Atelier du luxe africain et mondial.</p>
                    <div style="margin-top: 2rem;">
                        <a href="https://www.facebook.com/profile.php?id=100050481160133" target="_blank"
                            style="color: var(--color-gold); margin-right: 1.5rem; text-decoration: none; font-size: 0.75rem; letter-spacing: 0.1em;">FACEBOOK</a>
                        <a href="https://wa.me/22507450423" target="_blank"
                            style="color: var(--color-gold); text-decoration: none; font-size: 0.75rem; letter-spacing: 0.1em;">WHATSAPP</a>
                    </div>
                </div>
                <div class="footer-links">
                    <h4>RUBRIQUES</h4>
                    <ul>
                        <li><a href="createur.html">Patrick ASSO</a></li>
                        <li><a href="atelier.html">L'Atelier</a></li>
                        <li><a href="collections.html">Collections</a></li>
                        <li><a href="atelier.html#contact">Contact</a></li>
                    </ul>
                </div>
                <div class="footer-contact">
                    <h4>Contact</h4>
                    <p>Cocody-Attoban,Abidjan, Côte d'Ivoire</p>
                    <p>+(225) 07 07 45 04 23</p>
                    <p>info@patrickasso.net</p>
                </div>
            </div>
            <div class="footer-bottom">
                &copy; 2026 Patrick ASSO Couture | Tous droits réservés | By nivaQuine
            </div>
        </div>
    </footer>"""

files_to_update = [
    "atelier.html",
    "collection-asian.html",
    "collection-love-love.html",
    "collection-sahel.html",
    "collection-special.html",
    "collection-urban.html",
    "collections.html",
    "createur.html"
]

footer_re = re.compile(r'<footer.*?>.*?</footer>', re.DOTALL | re.IGNORECASE)

def fix_content(content):
    # Common repair for broken encodings if we detect them
    # But for now, we just ensure the footer is correct.
    return footer_re.sub(new_footer, content)

for filename in files_to_update:
    path = os.path.join(r'd:\dev\ANTIGRAVITY\PATRICK ASSO COUTURE', filename)
    if not os.path.exists(path):
        continue
    
    # Read with detection
    content = None
    for enc in ['utf-8', 'windows-1252', 'latin-1']:
        try:
            with open(path, 'r', encoding=enc) as f:
                content = f.read()
            # Check if it's likely the right encoding by checking for a known character
            # or just proceed if it didn't crash.
            break
        except UnicodeDecodeError:
            continue
    
    if content:
        new_content = fix_content(content)
        # Always write as UTF-8
        with open(path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Fixed and saved {filename} as UTF-8")
