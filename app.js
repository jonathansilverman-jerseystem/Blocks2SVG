// Get DOM elements
const uploadArea = document.getElementById('uploadArea');
const fileInput = document.getElementById('fileInput');
const status = document.getElementById('status');
const statusText = document.getElementById('statusText');
const results = document.getElementById('results');
const resultsText = document.getElementById('resultsText');
const blockCount = document.getElementById('blockCount');
const downloadBtn = document.getElementById('downloadBtn');
const resetBtn = document.getElementById('resetBtn');

let downloadBlob = null;

// Click to upload
uploadArea.addEventListener('click', () => {
    fileInput.click();
});

// File selected
fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        processFile(file);
    }
});

// Drag and drop handlers
uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.classList.add('dragover');
});

uploadArea.addEventListener('dragleave', () => {
    uploadArea.classList.remove('dragover');
});

uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.classList.remove('dragover');
    
    const file = e.dataTransfer.files[0];
    if (file && file.name.endsWith('.llsp3')) {
        processFile(file);
    } else {
        alert('Please drop a .llsp3 file');
    }
});

// Process the uploaded file
async function processFile(file) {
    // Show processing status
    uploadArea.classList.add('hidden');
    status.classList.remove('hidden');
    results.classList.add('hidden');
    
    try {
        statusText.textContent = 'Unzipping file...';
        
        // Load the .llsp3 file as a ZIP
        const zip = await JSZip.loadAsync(file);
        
        statusText.textContent = 'Extracting SVG...';
        
        // Find and extract the icon.svg file
        const iconFile = zip.file('icon.svg');
        if (!iconFile) {
            throw new Error('No icon.svg found in file');
        }
        
        const svgContent = await iconFile.async('string');
        
        statusText.textContent = 'Parsing coding blocks...';
        
        // Parse the SVG and extract individual blocks
        const blocks = extractBlocks(svgContent);
        
        statusText.textContent = `Creating ${blocks.length} individual files...`;
        
        // Create a new ZIP with all individual blocks
        const outputZip = new JSZip();
        
        // Add README
        const readme = createReadme(file.name, blocks.length);
        outputZip.file('README.txt', readme);
        
        // Add each block
        blocks.forEach((blockSvg, index) => {
            const filename = `block_${String(index + 1).padStart(3, '0')}.svg`;
            outputZip.file(filename, blockSvg);
        });
        
        statusText.textContent = 'Creating download package...';
        
        // Generate the ZIP file
        downloadBlob = await outputZip.generateAsync({type: 'blob'});
        
        // Show results
        status.classList.add('hidden');
        results.classList.remove('hidden');
        blockCount.textContent = blocks.length;
        
    } catch (error) {
        console.error('Error processing file:', error);
        status.classList.add('hidden');
        uploadArea.classList.remove('hidden');
        alert('Error processing file: ' + error.message);
    }
}

// Extract individual blocks from SVG
function extractBlocks(svgContent) {
    const parser = new DOMParser();
    const svgDoc = parser.parseFromString(svgContent, 'image/svg+xml');
    
    // Get the root SVG element
    const svgRoot = svgDoc.querySelector('svg');
    const viewBox = svgRoot.getAttribute('viewBox') || '0 0 1307 1485';
    
    // Get the style element
    const styleElement = svgDoc.querySelector('style');
    const styleContent = styleElement ? styleElement.textContent : '';
    
    // Find all top-level groups (these are the individual blocks)
    const groups = svgDoc.querySelectorAll('svg > g');
    
    const blocks = [];
    
    groups.forEach((group, index) => {
        // Create a new SVG for this block
        const blockSvg = `<svg
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    version="1.1" 
    preserveAspectRatio="xMidYMid meet"
    viewBox="${viewBox}">
<style>
${styleContent}
</style>
${group.outerHTML}
</svg>`;
        
        blocks.push(blockSvg);
    });
    
    return blocks;
}

// Create README content
function createReadme(originalFilename, blockCount) {
    return `LEGO SPIKE Coding Blocks Extracted

Original File: ${originalFilename}
Extraction Date: ${new Date().toLocaleDateString()}
Total Blocks: ${blockCount}

CONTENTS:
- block_001.svg through block_${String(blockCount).padStart(3, '0')}.svg
- Each file is a separate coding block from your program
- All SVG files are high-resolution and scalable

HOW TO USE:
1. Open any .svg file in a web browser (Chrome, Firefox, Edge, etc.)
2. Insert into documents: Drag and drop into PowerPoint, Word, or Google Docs
3. Edit: Import into vector graphics software (Inkscape, Illustrator, etc.)
4. Convert: Use online converters to create PNG or JPG versions if needed

NOTES:
- Some files may be connector pieces or partial blocks
- SVG files maintain perfect quality at any size
- Files are organized in the order they appear in your program

Created with LEGO SPIKE Block Extractor
https://github.com/yourusername/spike-block-extractor
`;
}

// Download button handler
downloadBtn.addEventListener('click', () => {
    if (downloadBlob) {
        const url = URL.createObjectURL(downloadBlob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'spike_blocks.zip';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
});

// Reset button handler
resetBtn.addEventListener('click', () => {
    results.classList.add('hidden');
    uploadArea.classList.remove('hidden');
    fileInput.value = '';
    downloadBlob = null;
});
