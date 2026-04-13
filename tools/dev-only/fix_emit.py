path = r"C:\crm-web-demos\public\emit.py"
text = open(path, encoding="utf-8").read()
repls = [
("L?Orbite ? Variantes | Kyrio", "L'Orbite \\u2014 Variantes | Kyrio"),
("L?Orbite ? Variantes", "L'Orbite \\u2014 Variantes"),
("8 d?clinaisons du concept Orbite", "8 d\\u00e9clinaisons du concept Orbite"),
("passage ? lisible et m?morable.", "passage \\u2014 lisible et m\\u00e9morable."),
("Anneau en d?grad? violet ? cyan : plus color? et contemporain.", "Anneau en d\\u00e9grad\\u00e9 violet \\u2192 cyan : plus color\\u00e9 et contemporain."),
("Deux anneaux d?cal?s, point sur l?ouverture externe ? aspect tech et pr?cision.", "Deux anneaux d\\u00e9cal\\u00e9s, point sur l\\u2019ouverture externe \\u2014 aspect tech et pr\\u00e9cision."),
('"Orbite ?paisse"', '"Orbite \\u00c9paisse"'),
("Trait plus massif et point plus large ? impact visuel fort, identit? affirm?e.", "Trait plus massif et point plus large \\u2014 impact visuel fort, identit\\u00e9 affirm\\u00e9e."),
("Ligne d?licate, anneau plus grand ? ?l?gance et minimalisme.", "Ligne d\\u00e9licate, anneau plus grand \\u2014 \\u00e9l\\u00e9gance et minimalisme."),
("Trois points aux couleurs de la marque ? ludique et chaleureux.", "Trois points aux couleurs de la marque \\u2014 ludique et chaleureux."),
('"Orbite Carr?e"', '"Orbite Carr\\u00e9e"'),
("Contour arrondi ouvert ? la place du cercle ? marque plus singuli?re.", "Contour arrondi ouvert \\u00e0 la place du cercle \\u2014 marque plus singuli\\u00e8re."),
("Rayons autour du point ? ?nergie, lancement, dynamisme.", "Rayons autour du point \\u2014 \\u00e9nergie, lancement, dynamisme."),
]
for a, b in repls:
    text = text.replace(a, b)
# fix card 6 preview line - replace wrong svg_multi dark
old = "pv(svg_multi(DR, DD, DR, \"#22d3ee\", 9, 7, 5),"
new = "pv(svg_multi(DR, \"#bef264\", \"#a5b4fc\", \"#22d3ee\", 9, 7, 5),"
if old in text:
    text = text.replace(old, new)
open(path, "w", encoding="utf-8").write(text)
print("emit.py patched")
