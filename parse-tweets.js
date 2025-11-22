const fs = require('fs');
const path = require('path');

const csvFile = path.join(__dirname, 'TwExportly_stilllllloading_tweets_2025_11_22.csv');
const outputFile = path.join(__dirname, 'tweets-quotes.json');

function parseCSV(csvContent) {
    const lines = csvContent.split('\n');
    const quotes = [];
    
    // Skip header line
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;
        
        // Parse CSV line (handling quoted fields)
        const matches = line.match(/^'([^']+)',"([^"]*(?:"[^"]*")*[^"]*)"(?:,|$)/);
        if (!matches) continue;
        
        const tweetId = matches[1];
        let text = matches[2];
        
        // Clean up text - remove @mentions at start, remove URLs, clean up
        text = text
            .replace(/^@\w+\s+/, '') // Remove @mentions at start
            .replace(/https?:\/\/[^\s]+/g, '') // Remove URLs
            .replace(/\s+/g, ' ') // Multiple spaces to single
            .trim();
        
        // Filter out very short tweets, RTs, and empty ones
        if (text.length < 20 || text.startsWith('RT @') || text.toLowerCase().includes('retweet')) {
            continue;
        }
        
        // Extract meaningful quotes
        if (text.length > 0) {
            quotes.push({
                text: text,
                id: tweetId
            });
        }
    }
    
    return quotes;
}

try {
    const csvContent = fs.readFileSync(csvFile, 'utf-8');
    const quotes = parseCSV(csvContent);
    
    // Remove duplicates and limit to best quotes
    const uniqueQuotes = [];
    const seen = new Set();
    
    quotes.forEach(quote => {
        const key = quote.text.toLowerCase().substring(0, 50);
        if (!seen.has(key) && quote.text.length > 15) {
            seen.add(key);
            uniqueQuotes.push(quote);
        }
    });
    
    // Sort by length (prefer medium-length quotes)
    uniqueQuotes.sort((a, b) => {
        const aLen = a.text.length;
        const bLen = b.text.length;
        // Prefer quotes between 30-150 chars
        const aScore = (aLen >= 30 && aLen <= 150) ? 1 : 0;
        const bScore = (bLen >= 30 && bLen <= 150) ? 1 : 0;
        if (aScore !== bScore) return bScore - aScore;
        return aLen - bLen;
    });
    
    // Take top 30 quotes
    const topQuotes = uniqueQuotes.slice(0, 30);
    
    fs.writeFileSync(outputFile, JSON.stringify(topQuotes, null, 2));
    console.log(`✅ Parsed ${topQuotes.length} quotes from tweets`);
    console.log(`📝 Generated tweets-quotes.json`);
} catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
}

