#!/usr/bin/env node
/**
 * Script to generate a JSON file combining old loops from Gist with new loop data.
 * Usage: node generate_loops_json.js <new_loops_directory> <pack_number>
 * Example: node generate_loops_json.js /path/to/new/loops 39
 */

import fs from 'fs';
import path from 'path';
import https from 'https';
import { URL } from 'url';

// GitHub Gist URL containing the existing loops data
const GIST_URL = 'https://gist.githubusercontent.com/trillbill/d9e8a3c4ff5502053f11e6507970c64c/raw';

/**
 * Fetch existing loop data from the GitHub Gist
 */
async function fetchExistingLoops() {
    return new Promise((resolve, reject) => {
        https.get(GIST_URL, (response) => {
            let data = '';
            
            response.on('data', (chunk) => {
                data += chunk;
            });
            
            response.on('end', () => {
                try {
                    const loops = JSON.parse(data);
                    resolve(loops);
                } catch (error) {
                    reject(new Error(`Failed to parse JSON: ${error.message}`));
                }
            });
        }).on('error', (error) => {
            reject(new Error(`Failed to fetch existing loops: ${error.message}`));
        });
    });
}

/**
 * Extract BPM and key information from filename.
 * Expected format: "Song-Name-120bpm-C#min.wav"
 */
function extractLoopInfo(filename) {
    // Remove file extension
    const nameWithoutExt = path.parse(filename).name;
    
    // Extract BPM and key using regex
    // Pattern: -(\d+)bpm-([A-G]#?[a-z]+)
    const pattern = /-(\d+)bpm-([A-G]#?[a-z]+)/;
    const match = nameWithoutExt.match(pattern);
    
    if (match) {
        const bpm = match[1];
        const key = match[2];
        // Create title by replacing hyphens with spaces and removing BPM/key info
        const title = nameWithoutExt.replace(pattern, '').replace(/-/g, ' ');
        return { title, bpm, key };
    } else {
        // Fallback: just use the filename without extension
        const title = nameWithoutExt.replace(/-/g, ' ');
        return { title, bpm: null, key: null };
    }
}

/**
 * Create properly encoded URL for the loop file.
 * Handles sharp key encoding (# to %23).
 */
function createLoopUrl(baseUrl, filename) {
    // URL encode the filename, which will convert # to %23
    const encodedFilename = encodeURIComponent(filename);
    return `${baseUrl}/${encodedFilename}`;
}

/**
 * Scan directory for new loop files and create loop data structure.
 */
function scanNewLoops(directory, packNumber) {
    if (!fs.existsSync(directory)) {
        throw new Error(`Directory '${directory}' does not exist`);
    }
    
    // Create base URL for the pack (following the existing pattern)
    const baseUrl = `https://d23vnzhpxwsomk.cloudfront.net/RIGHTER_PACK${packNumber}`;
    
    const loops = [];
    const audioExtensions = ['.wav', '.mp3', '.m4a', '.aiff'];
    
    // Get all files in the directory
    const files = fs.readdirSync(directory);
    
    for (const filename of files) {
        const filePath = path.join(directory, filename);
        
        // Skip directories
        if (fs.statSync(filePath).isDirectory()) {
            continue;
        }
        
        const fileExt = path.extname(filename).toLowerCase();
        if (!audioExtensions.includes(fileExt)) {
            continue;
        }
        
        // Extract loop information
        const { title, bpm, key } = extractLoopInfo(filename);
        
        // Create the loop URL
        const loopUrl = createLoopUrl(baseUrl, filename);
        
        // Create loop object with formatted title
        const formattedTitle = bpm && key ? `${title} ${bpm}bpm ${key}` : title;
        const loopData = {
            url: loopUrl,
            title: formattedTitle
        };
        
        loops.push(loopData);
        console.log(`Added: ${formattedTitle} -> ${filename}`);
    }
    
    if (loops.length === 0) {
        throw new Error(`No audio files found in '${directory}'`);
    }
    
    // Create pack data structure
    const packData = {
        pack_number: packNumber.toString(),
        pack_url: `https://d23vnzhpxwsomk.cloudfront.net/RIGHTER_PACK${packNumber}/RIGHTER_PACK${packNumber}.zip`,
        loops: loops
    };
    
    return packData;
}

/**
 * Main function
 */
async function main() {
    const args = process.argv.slice(2);
    
    if (args.length !== 2) {
        console.log('Usage: node generate_loops_json.js <new_loops_directory> <pack_number>');
        console.log('Example: node generate_loops_json.js /path/to/new/loops 39');
        process.exit(1);
    }
    
    const [newLoopsDirectory, packNumberStr] = args;
    
    // Validate pack number
    const packNumber = parseInt(packNumberStr, 10);
    if (isNaN(packNumber)) {
        console.error('Error: Pack number must be an integer');
        process.exit(1);
    }
    
    try {
        console.log('Fetching existing loops from Gist...');
        const existingLoops = await fetchExistingLoops();
        console.log(`Found ${existingLoops.length} existing packs`);
        
        console.log(`Scanning new loops in '${newLoopsDirectory}' for pack ${packNumber}...`);
        const newPack = scanNewLoops(newLoopsDirectory, packNumber);
        
        console.log(`Found ${newPack.loops.length} new loops`);
        
        // Combine data: new pack first, then existing packs
        const combinedData = [newPack, ...existingLoops];
        
        // Generate output filename
        const outputFilename = `combined_loops_pack_${packNumber}.json`;
        
        // Write combined data to JSON file
        fs.writeFileSync(outputFilename, JSON.stringify(combinedData, null, 2), 'utf8');
        
        console.log(`\nSuccess! Combined loop data saved to '${outputFilename}'`);
        console.log(`Total packs: ${combinedData.length}`);
        console.log(`New pack ${packNumber} added with ${newPack.loops.length} loops`);
        
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}

// Run the script
main();

export {
    fetchExistingLoops,
    scanNewLoops,
    extractLoopInfo,
    createLoopUrl
};
