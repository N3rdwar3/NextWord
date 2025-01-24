<?php

require_once "vendor/autoload.php";

use function Laravel\Prompts\error;
use function Laravel\Prompts\spin;
use function Laravel\Prompts\warning;
use function Laravel\Prompts\note;
use function Laravel\Prompts\text;
use function Laravel\Prompts\info;
use function Laravel\Prompts\confirm;

// prompt user for day they want to generate from Y-m-d
note('Welcome to puzzle builder.');
note('You are going to be provided with multiple puzzles and you can confirm or deny them. Afterwards you will have a puzzle-additions.json file generated for you.');
$startDateYMD = text('In Y-m-d format, please enter which date to start generating puzzles from', default: (new \DateTime())->format('Y-m-d'));
$activeDate = new \DateTime($startDateYMD);
Puzzle::$wordFriends = json_decode(file_get_contents("wordfriends.json", "rb"), true, 512, JSON_THROW_ON_ERROR);
$puzzle = new Puzzle($activeDate);
while (true) {
    if($puzzle->needsFirstWord()){
        $startWord = text("Starting Word?");
        $puzzle->addFirstWord($startWord);
        continue;
    }
    info("On Day: " . $activeDate->format('M d, Y'));
    $puzzle->printPuzzle();
    $action = text("Next Action? ", placeholder: 'step(s)/forcestep(fs)/add(a)/back(b)/restart(r)/finish(f)');

    if ($action === 's') {
        // show available words that come from this word
        $continue = $puzzle->showAvailableWords(); // wonderful variable name
        if (!$continue) {
            continue;
        }
        $word = text("Next Word");
        if ($puzzle->isValid($word)) {
            $puzzle->addWord($word);
        } else {
            error('Invalid word!!');
        }
    }
    elseif($action === 'fs') {
        // this ignores the wordfriends list
        $word = text("Next Word... make sure its in wordlist.txt and rebuild wordlist.json!!");
        $puzzle->addWord($word);
    }
    elseif ($action === 'a') {
        $puzzle->addPuzzle();
        $activeDate->modify('+1 day');
        $puzzle = new Puzzle($activeDate);
    }
    elseif ($action === 'b') {
        $puzzle->removeLastWord();
    }
    elseif ($action === 'r') {
        $puzzle = new Puzzle($activeDate);
    }
    elseif ($action === 'f') {
        break;
    }
    else {
        error('Invalid action!! (' . $action . ')');
    }
}

$puzzleAdditions = fopen("puzzle-additions.json", "wb");
fwrite($puzzleAdditions, json_encode(Puzzle::$acceptedPuzzles, JSON_PRETTY_PRINT));
fclose($puzzleAdditions);

class Puzzle
{
    public const int MIN_PUZZLE_LENGTH = 3;
    public const int MAX_PUZZLE_LENGTH = 6;
    public static array $wordFriends;
    public static $acceptedPuzzles = [];
    private string $startWord;
    private string $activeWord;
    private array $wordPath = [];
    private int $steps;

    public function needsFirstWord(): bool
    {
        return empty($this->startWord);
    }
    public function __construct(private readonly DateTime $activeDate) {}

    public function addPuzzle()
    {
        self::$acceptedPuzzles[$this->activeDate->format("Y-m-d")] = [
            'startWord' => strtoupper($this->startWord),
            'finalWord' => strtoupper($this->activeWord),
            'authorsBest' => $this->solutionLength(),
        ];
    }

    private function solutionLength()
    {
        return count($this->wordPath);
    }

    public function generatePuzzle(): bool
    {
        $this->startWord = $this->getRandomEntryFromWordFriends();
        $this->activeWord = $this->startWord;

        $this->steps = random_int(self::MIN_PUZZLE_LENGTH, self::MAX_PUZZLE_LENGTH);
        while ($this->steps > 0) {
            $stepped = $this->stepForward();
            if (!$stepped) {
                return false;
            }
        }
        return true;
    }

    private function getRandomEntryFromWordFriends(): string
    {
        while (true) {
            $key = array_rand(self::$wordFriends);
            $wordFriends = self::$wordFriends[$key] ?? [];
            if (count($wordFriends) === 0) {
                continue;
            }
            return $key;
        }
    }

    private function stepForward(): bool
    {
        --$this->steps;
        $wordsFriends = $this->availableWords();
        // dont add words already in the list.
        if (count($wordsFriends) === 0) {
            return false;
        }
        $this->activeWord = $wordsFriends[array_rand($wordsFriends)];
        $this->wordPath[] = $this->activeWord;
        return true;
    }

    private function availableWords(): array
    {
        return array_filter(self::$wordFriends[$this->activeWord] ?? [], function ($elem) {
            return !in_array($elem, $this->wordPath, true) && $elem !== $this->startWord;
        });
    }

    public function printPuzzle(): void
    {
        info('Start Word: ' . $this->startWord);
        info('Path: (' . $this->solutionLength() . ') ' . $this->startWord . ' -> ' . implode(', ', $this->wordPath));
    }

    public function showAvailableWords(): bool
    {
        $availableWords = $this->availableWords();
        if (count($availableWords) === 0) {
            error('No words left to choose from!! go back a step (b)');
            return false;
        }
        note('{' . implode(', ', $availableWords) . '}');
        return true;
    }

    public function isValid(string $word)
    {
        return in_array($word, $this->availableWords(), true) && $word !== $this->startWord;
    }

    public function addWord(string $word)
    {
        $this->activeWord = $word;
        $this->wordPath[] = $word;
    }

    public function removeLastWord()
    {
        array_pop($this->wordPath);
        if(count($this->wordPath) === 0){
            $this->activeWord = '';
            $this->startWord = '';
        } else {
            $this->activeWord = $this->wordPath[count($this->wordPath) - 1];
        }
    }

    public function addFirstWord(string $startWord) {
        $this->startWord = $startWord;
        $this->activeWord = $this->startWord;
    }
}
