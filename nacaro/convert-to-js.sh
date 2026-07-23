#!/bin/bash
# Script to convert TypeScript Vue SFCs to JavaScript

# Remove lang="ts" from script tags
find app -name "*.vue" -type f -exec sed -i 's/<script setup lang="ts">/<script setup>/g' {} \;

# Remove type annotations after variables
find app -name "*.vue" -type f -exec sed -i 's/ as string//g' {} \;
find app -name "*.vue" -type f -exec sed -i 's/ as number//g' {} \;
find app -name "*.vue" -type f -exec sed -i 's/ as boolean//g' {} \;

# Convert defineProps with type parameter to runtime props
# This is more complex and needs manual review, but we'll do basic replacements

echo "Conversion complete. Please review the changes and test the build."
