import {defineStore} from 'pinia'

export let useGameStateStore = defineStore('game', {
    state() {
        return {
            activeWord: 'THE',
            finalWord: 'WHERE',
            startWord: 'THE',
            wordPath: ['THE'],
            trashDisabled: true,
            authorsBest: 5,
            activeIndex: null
        }
    },
    actions: {
        // replace a letter in the active word at the given index
        replace(index, newLetter) {
            let newWord = '';
            for (let i = 0; i < this.activeWord.length; i++) {
                if (i === +(index)) {
                    newWord += newLetter
                } else {
                    newWord += this.activeWord[i];
                }
            }
            this.activeWord = newWord;
            this.activeIndex = null;
            this.wordPath.push(this.activeWord);
        },
        // add a letter to the word at the given index
        add(index, newLetter) {
            let newWord = '';
            for (let i = 0; i < this.activeWord.length; i++) {
                if (i === +(index)) {
                    newWord += newLetter
                }
                newWord += this.activeWord[i];
            }
            // then this must be in the last spot that exceeds the length of our word
            if(this.activeWord.length === newWord.length){
                newWord += newLetter;
            }
            this.activeWord = newWord;
            this.activeIndex = null;
            this.wordPath.push(this.activeWord);
        },
        remove(index) {
            let newWord = '';
            for (let i = 0; i < this.activeWord.length; i++) {
                if (i === +(index)) {
                    continue;
                }
                newWord += this.activeWord[i];
            }
            this.activeWord = newWord;
            this.activeIndex = null;
            this.wordPath.push(this.activeWord);
        }
    },
})
