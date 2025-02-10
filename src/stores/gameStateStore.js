import {defineStore} from 'pinia';
import { toRaw } from "vue";
export let useGameStateStore = defineStore('game', {
    state() {
        return {
            activeWord: '',
            finalWord: '',
            startWord: '',
            wordPath: [],
            trashDisabled: true,
            authorsBest: null,
            activeIndex: null,
            activeLetter: null,
            draggingActiveTile: false,
            draggingAlphabetTile: false,
            animateOut: false,
            animateIn: false,
            animateSuccessBackground: false,
            animateFailureBackground: false,
            gameOver: false,
            showTodaysIntro: false,
            score: 0,
            maxAttempts: 10,
            apiUrl: import.meta.env.MODE === 'development'
                ? 'http://nextword.dev.ca:8888'
                : 'https://nextword.nerdware.ca'
        }
    },
    actions: {
        // index should always be passed
        async modify(callback, params){
            if(this.score >= this.maxAttempts){
                this.gameOver=true;
            }
            if(params.index === null){
                return
            }
            let candidateWord = this[callback](params);
            let {result, code} = await this.checkIfWordIsValid(candidateWord);
            this.activeIndex = null;
            this.activeLetter = null;
            if (result === true) {
                this.animateOut=true;
                this.animateSuccessBackground = true;
                setTimeout(() => {
                    this.animateOut = false;
                    this.animateSuccessBackground = false;
                    this.score++;
                    this.updateActiveWord(candidateWord);
                    // check if the game had ended
                    if(this.activeWord === this.finalWord){
                        this.gameOver = true;
                    }
                }, 350)
            } else {
                this.animateFailureBackground = true;
                setTimeout(() => {
                    this.animateFailureBackground = false;
                }, 350)
            }
        },
        // replace a letter in the active word at the given index
        replace(params) {
            // this is to avoid casting null to 0
            let {index, letter} = params;
            let newWord = '';
            for (let i = 0; i < this.activeWord.length; i++) {
                if (i === +(index)) {
                    newWord += letter
                } else {
                    newWord += this.activeWord[i];
                }
            }
            return newWord;

        },
        // add a letter to the word at the given index
        add(params) {
            // this is to avoid casting null to 0
            let {index, letter} = params;
            let newWord = '';
            for (let i = 0; i < this.activeWord.length; i++) {
                if (i === +(index)) {
                    newWord += letter
                }
                newWord += this.activeWord[i];
            }
            // then this must be in the last spot that exceeds the length of our word
            if (this.activeWord.length === newWord.length) {
                newWord += letter;
            }
            return newWord;
        },
        remove(params) {
            // this is to avoid casting null to 0
            let {index} = params;
            let newWord = '';
            for (let i = 0; i < this.activeWord.length; i++) {
                if (i === +(index)) {
                    continue;
                }
                newWord += this.activeWord[i];
            }
            return newWord;
        },
        clickTile(index, letter) {
            // Cases:
            // 1. ActiveWordTile Selected, Nothing Else Selected
            // 2. ActiveWordTile Selected, AlphabetTile Already Selected
            // 3. ActiveWordTile Selected, Another ActiveWordTile was Selected
            // 4. AlphabetTile Selected, Nothing Else Selected
            // 5. AlphabetTile Selected, ActiveWordTile Already Selected
            // 6. AlphabetTile Selected, Another AlphabetTile Already Selected

            // 1. ActiveWordTile Selected, Nothing Else Selected
            if(index !== null && this.activeLetter === null && this.activeIndex === null){
                this.activeIndex = index;
            }
            // 2. ActiveWordTile Selected, AlphabetTile Already Selected
            else if(index !== null && this.activeLetter !== null){
                this.modify(
                    'replace',
                    {
                        'index': index,
                        'letter': this.activeLetter
                    })
            }
            // 3. ActiveWordTile Selected, Another ActiveWordTile was Selected
            else if(index !== null && this.activeIndex !== null){
                if(index === this.activeIndex){
                    this.activeIndex = null;
                } else {
                    this.activeIndex = index;
                }
            }
            // 4. AlphabetTile Selected, Nothing Else Selected
            else if(letter !== null && this.activeIndex === null && this.activeLetter === null){
                this.activeLetter = letter;
            }
            // 5. AlphabetTile Selected, ActiveWordTile Already Selected
            else if(letter !== null && this.activeIndex !== null)
            {
                this.modify(
                    'replace',
                    {
                        'index': this.activeIndex,
                        'letter': letter
                    }
                )
            }
            // 6. AlphabetTile Selected, Another AlphabetTile Already Selected
            else if(letter !== null && this.activeLetter !== null)
            {
                if(this.activeLetter === letter){
                    this.activeLetter = null;
                } else {
                    this.activeLetter = letter;
                }
            }
            else {
                console.error("How did this happen?", {
                    activeIndex: this.activeIndex,
                    activeLetter: this.activeLetter,
                    index: index,
                    letter: letter,
                });
            }
        },
        // called from each of the modifiers to see if we have a valid new word to add to the list and update our active word
        async checkIfWordIsValid(candidateWord) {
            // word must be new
            if (this.activeWord === candidateWord) {
                return {
                    result: false,
                    code: 'is-same',
                }
            }
            // check dict
            const isRealWord = await this.isARealWord(candidateWord);
            if (!isRealWord) {
                return {
                    result: false,
                    code: 'no-exist',
                }
            }
            return {
                result: true,
                code: 'success'
            }
        },
        // update the active word, unset the currently selected index from the active word, add the new word to the list
        updateActiveWord(newWord) {
            this.activeWord = newWord;
            this.wordPath.push(this.activeWord);
        },
        async initGame() {
            // set todays puzzle

            const puzzleResponse = await fetch(this.apiUrl + "/puzzle");
            const puzzleJson = await puzzleResponse.json();
            const puzzle = puzzleJson[0];
            this.startWord = puzzle.start_word.toUpperCase();
            this.activeWord = puzzle.start_word.toUpperCase();
            this.finalWord = puzzle.final_word.toUpperCase();
            this.authorsBest = +(puzzle.top_score);
            this.wordPath = [puzzle.start_word.toUpperCase()];
            this.showTodaysIntro = true;
        },
        resetGame() {
            this.activeWord = this.startWord;
            this.wordPath = [this.startWord];
            this.activeIndex = null;
            this.gameOver = false;
            this.score = 0;
        },
        async isARealWord(newWord) {
            // get first letter of new Word and length of word
            let lowerNewWord = newWord.toLowerCase();
            const wordResponse = await fetch(this.apiUrl + "/word?proposed=" + lowerNewWord);
            const wordJson = await wordResponse.json();
            return wordJson.valid;
        },
        revertActiveWord(word, index){
            this.wordPath = this.wordPath.slice(0, index+1);
            this.activeWord = word;
            this.activeIndex = null;
            this.activeLetter = null;
            this.score = index;
        }
    }
})
