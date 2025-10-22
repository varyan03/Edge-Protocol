// score.js

export class ScoreManager {
    constructor() {
        /**
         * The key we use to store the high score in local storage.
         */
        this.storageKey = 'highScore';
        
        /**
         * The player's highest score, loaded from local storage.
         * Defaults to 0 if no score is found.
         */
        this.highScore = this.loadHighScore();
    }

    /**
     * Loads the high score from local storage.
     * @returns {number} The stored high score, or 0 if none exists.
     */
    loadHighScore() {
        const storedScore = localStorage.getItem(this.storageKey);
        // Parse the stored string as an integer, or default to 0.
        return parseInt(storedScore, 10) || 0;
    }

    /**
     * Gets the current high score.
     * @returns {number} The high score.
     */
    getHighScore() {
        return this.highScore;
    }

    /**
     * Checks the final game score against the high score.
     * If the new score is higher, it updates the high score
     * and saves it to local storage.
     * @param {number} currentScore The score from the completed game.
     */
    updateHighScore(currentScore) {
        if (currentScore > this.highScore) {
            this.highScore = currentScore;
            localStorage.setItem(this.storageKey, this.highScore.toString());
            console.log(`New high score saved: ${this.highScore}`);
        }
    }

    /**
     * Optional: A helper function to reset the high score.
     */
    resetHighScore() {
        this.highScore = 0;
        localStorage.removeItem(this.storageKey);
    }
}