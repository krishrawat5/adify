import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

# We need to add the import first
if "import { BorderRotate }" not in content:
    content = content.replace("import { motion } from 'motion/react';", "import { motion } from 'motion/react';\nimport { BorderRotate } from './components/ui/animated-gradient-border';")

# Find all <motion.div that have className="premium-card
parts = content.split('<motion.div')
new_parts = [parts[0]]

stack = 0
for part in parts[1:]:
    # Reconstruct the string to see if it's a premium card
    # We check if before the FIRST '>' it has 'premium-card'
    tag_content = part.split('>', 1)[0]
    
    if "premium-card" in tag_content:
        new_parts.append('<BorderRotate animationMode="rotate-on-hover"' + part)
    else:
        new_parts.append('<motion.div' + part)

content = "".join(new_parts)

# Now replace matching </motion.div> to </BorderRotate> for the ones we changed.
# Actually, since we only have premium-card motion.divs at a specific depth, it might be tricky to match the exact closing tag with regex.
# Let's count them manually. There are 10 occurrences.
