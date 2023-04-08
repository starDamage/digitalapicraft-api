import axios from 'axios';
import { WORD_MESSAGES, documentUrl } from '../utils/common.variables';
import { StatusCodes } from 'http-status-codes';
import { responseGenerators } from '../utils/common.functions';
import http from 'http';

// get words count handler
export const wordCountHandler = async (req, res, next) => {
    try {
        let { data: document } = await axios.get(documentUrl);
        const words = document.replace(/[^\w\s]/gi, '').split(/\s+/);
        let topTenWords = await analyzeDocument(words);
        return res
            .status(StatusCodes.OK)
            .send(
                responseGenerators(
                    { topTenWords },
                    StatusCodes.OK,
                    WORD_MESSAGES.SUCCESS,
                    false
                )
            );
    } catch (err) {
        next(err);
    }
};

// get words count with different approach
export const wordCountSecondHandler = async (req, res, next) => {
    try {
        http.get(documentUrl, (response) => {
            let rawData = '';
            response.on('data', (chunk) => { rawData += chunk; });
            response.on('end', async () => {
                try {
                    const words = rawData.replace(/[^\w\s]/gi, '').split(/\s+/);
                    let topTenWords = await analyzeDocument(words);
                    return res
                        .status(StatusCodes.OK)
                        .send(
                            responseGenerators(
                                { topTenWords },
                                StatusCodes.OK,
                                WORD_MESSAGES.SUCCESS,
                                false
                            )
                        );
                } catch (e) {
                    console.error(e.message);
                }
            });
        }).on('error', (e) => {
            next(e);
        });
    } catch (err) {
        next(err);
    }
};



export const analyzeDocument = async (words) => {
    const wordCount = {};
    words.forEach(word => {
        const lowercaseWord = word;
        wordCount[lowercaseWord] = (wordCount[lowercaseWord] || 0) + 1;
    });
    return Object.keys(wordCount)
        .sort((a, b) => wordCount[b] - wordCount[a])
        .slice(0, 10)
        .map(word => ({
            word: word,
            count: wordCount[word]
        }));
};