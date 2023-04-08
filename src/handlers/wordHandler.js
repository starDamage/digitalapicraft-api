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
        const wordCount = {};


        words.forEach(word => {
            const lowercaseWord = word;
            wordCount[lowercaseWord] = (wordCount[lowercaseWord] || 0) + 1;
        });
        const topTenWords = Object.keys(wordCount)
            .sort((a, b) => wordCount[b] - wordCount[a])
            .slice(0, 10)
            .map(word => ({
                word: word,
                count: wordCount[word]
            }));
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
            response.on('end', () => {
                try {
                    const words = rawData.split(/\s+/);
                    const wordCount = {};
                    words.forEach((word) => {
                        word = word.toLowerCase().replace(/[^\w]/g, '');
                        if (wordCount[word]) {
                            wordCount[word]++;
                        } else {
                            wordCount[word] = 1;
                        }
                    });
                    const sortedWords = Object.keys(wordCount).sort((a, b) => wordCount[b] - wordCount[a]).slice(0, 10);
                    const topTenWords = sortedWords.map((word) => {
                        return {
                            word,
                            count: wordCount[word]
                        };
                    });

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