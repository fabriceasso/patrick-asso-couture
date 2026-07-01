import re

file_path = r'd:\dev\ANTIGRAVITY\PATRICK ASSO COUTURE\createur.html'

# Read the file
for enc in ['utf-8', 'windows-1252', 'latin-1']:
    try:
        with open(file_path, 'r', encoding=enc) as f:
            content = f.read()
        used_enc = enc
        break
    except UnicodeDecodeError:
        continue

# ---- 1. Replace the CSS for world-tour-section ----
old_css = re.compile(
    r'/\* 4\. Global Footprint.*?/\* 5\. Big Parallax Quote \*/',
    re.DOTALL
)

new_css = '''/* 4. Global Footprint (Runway Destinations) */
        .world-tour-section {
            position: relative;
            height: 75vh;
            min-height: 500px;
            width: 100%;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            border-top: 1px solid rgba(242, 202, 80, 0.2);
            border-bottom: 1px solid rgba(242, 202, 80, 0.2);
        }

        /* Animated panorama background */
        .world-tour-bg {
            position: absolute;
            top: 0;
            left: 0;
            width: 120%;
            height: 100%;
            background-image: url('images/patrick_asso/scenes_du_monde.jpg');
            background-size: cover;
            background-position: left center;
            filter: grayscale(40%) brightness(0.5);
            animation: worldPan 30s ease-in-out infinite alternate;
            transform-origin: center;
            z-index: 0;
        }

        @keyframes worldPan {
            0%   { background-position: left center;  transform: scale(1.05); }
            50%  { transform: scale(1.1); }
            100% { background-position: right center; transform: scale(1.05); }
        }

        /* Gold vignette overlay */
        .world-tour-overlay {
            position: absolute;
            top: 0; left: 0; width: 100%; height: 100%;
            background:
                linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 40%, rgba(0,0,0,0.2) 60%, rgba(0,0,0,0.8) 100%),
                linear-gradient(to right,  rgba(0,0,0,0.6) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.6) 100%);
            z-index: 1;
        }

        .world-tour-content {
            position: relative;
            z-index: 2;
            width: 100%;
            padding: 0 5%;
        }

        /* Scrolling marquee strip */
        .destinations-marquee-wrapper {
            position: relative;
            z-index: 2;
            width: 100%;
            overflow: hidden;
            padding: 1.5rem 0;
            margin-top: 2.5rem;
            border-top: 1px solid rgba(242, 202, 80, 0.35);
            border-bottom: 1px solid rgba(242, 202, 80, 0.35);
            background: rgba(0, 0, 0, 0.45);
            backdrop-filter: blur(4px);
        }

        .destinations-marquee {
            display: flex;
            gap: 4rem;
            width: max-content;
            animation: scrollDestinations 22s linear infinite;
        }

        .destinations-marquee:hover {
            animation-play-state: paused;
        }

        @keyframes scrollDestinations {
            from { transform: translateX(0); }
            to   { transform: translateX(-50%); }
        }

        .dest-item {
            font-family: var(--font-serif);
            font-size: 1.8rem;
            color: rgba(255, 255, 255, 0.75);
            white-space: nowrap;
            transition: color 0.3s ease, text-shadow 0.3s ease;
            cursor: default;
            letter-spacing: 0.12em;
        }

        .dest-item:hover {
            color: var(--color-gold);
            text-shadow: 0 0 25px rgba(242, 202, 80, 0.8);
        }

        .dest-separator {
            color: var(--color-gold);
            font-size: 1.4rem;
            opacity: 0.55;
            align-self: center;
        }

        /* 5. Big Parallax Quote */'''

content = old_css.sub(new_css, content)

# ---- 2. Replace the HTML for the world-tour-section ----
old_html = re.compile(
    r'<!-- 4\. Global Footprint / Runway Tour -->.*?</section>',
    re.DOTALL
)

new_html = '''<!-- 4. Global Footprint / Runway Tour -->
        <section class="world-tour-section">
            <!-- Animated panorama image -->
            <div class="world-tour-bg"></div>
            <!-- Vignette overlay -->
            <div class="world-tour-overlay"></div>

            <!-- Text content -->
            <div class="world-tour-content">
                <p class="hero-label" style="margin-bottom: 1rem; letter-spacing: 0.4em;">RAYONNEMENT INTERNATIONAL</p>
                <h2 class="section-title-center" style="margin-bottom: 1.5rem; font-size: clamp(2rem, 5vw, 3.5rem); color: #fff;">Les Podiums du Monde</h2>
                <p class="body-text" style="max-width: 650px; margin: 0 auto; color: rgba(255,255,255,0.75);">
                    Il a particip&eacute; &agrave; de multiples d&eacute;fil&eacute;s de mode &agrave; travers la plan&egrave;te,
                    exportant la vision du Monolithe par-del&agrave; les oc&eacute;ans.
                </p>
            </div>

            <!-- Scrolling destinations marquee -->
            <div class="destinations-marquee-wrapper">
                <div class="destinations-marquee">
                    <span class="dest-item">USA</span>
                    <span class="dest-separator">&#10022;</span>
                    <span class="dest-item">CANADA</span>
                    <span class="dest-separator">&#10022;</span>
                    <span class="dest-item">THA&Iuml;LANDE</span>
                    <span class="dest-separator">&#10022;</span>
                    <span class="dest-item">FRANCE</span>
                    <span class="dest-separator">&#10022;</span>
                    <span class="dest-item">KENYA</span>
                    <span class="dest-separator">&#10022;</span>
                    <span class="dest-item">R.D. CONGO</span>
                    <span class="dest-separator">&#10022;</span>
                    <span class="dest-item">GUIN&Eacute;E</span>
                    <span class="dest-separator">&#10022;</span>
                    <span class="dest-item">S&Eacute;N&Eacute;GAL</span>
                    <span class="dest-separator">&#10022;</span>
                    <!-- Duplicate for seamless infinite loop -->
                    <span class="dest-item">USA</span>
                    <span class="dest-separator">&#10022;</span>
                    <span class="dest-item">CANADA</span>
                    <span class="dest-separator">&#10022;</span>
                    <span class="dest-item">THA&Iuml;LANDE</span>
                    <span class="dest-separator">&#10022;</span>
                    <span class="dest-item">FRANCE</span>
                    <span class="dest-separator">&#10022;</span>
                    <span class="dest-item">KENYA</span>
                    <span class="dest-separator">&#10022;</span>
                    <span class="dest-item">R.D. CONGO</span>
                    <span class="dest-separator">&#10022;</span>
                    <span class="dest-item">GUIN&Eacute;E</span>
                    <span class="dest-separator">&#10022;</span>
                    <span class="dest-item">S&Eacute;N&Eacute;GAL</span>
                    <span class="dest-separator">&#10022;</span>
                </div>
            </div>
        </section>'''

content = old_html.sub(new_html, content)

# Write back as UTF-8
with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Done. Sections updated successfully.")
