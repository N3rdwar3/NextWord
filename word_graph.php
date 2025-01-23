<?php

Wordifier::setWordList();
Wordifier::$resource = fopen('wordfriends.json', 'wb');
fwrite(Wordifier::$resource, '{' . PHP_EOL);
foreach (Wordifier::getNextWord() as $word) {
    if ($word === false) {
        continue;
    } // Avoid processing false values

    $wordy = new Wordifier($word);
    $wordy->getFriends();
    $wordy->writeFriends();
}
fwrite(Wordifier::$resource, '}' . PHP_EOL);
fclose(Wordifier::$resource);
class Wordifier
{
    public static array $wordDict;
    private int $length;
    private array $friends = [];
    public static $resource;

    public function __construct(private string $word)
    {
        $this->length = strlen($this->word);
    }

    public static function setWordList(): void
    {
        $json_data = file_get_contents('public/wordlist.json');
        self::$wordDict = json_decode($json_data, true);
    }

    public static function getNextWord(): iterable
    {
        $wl = fopen("wordlist.txt", "rb");

        if (!$wl) {
            throw new RuntimeException("Failed to open wordlist.txt");
        }

        try {
            while (!feof($wl)) {
                $word = fgets($wl); // fgets is better for handling lines safely
                if ($word !== false) {
                    yield trim($word); // Trim to remove trailing newline characters
                }
            }
        } finally {
            fclose($wl); // Ensure file is closed even if an error occurs
        }
    }

    public function getFriends(): void
    {
        foreach (self::$wordDict as $alphabet => $indexedArray) {
            foreach ($indexedArray as $index => $wordArr) {
                foreach($wordArr as $word) {
                    // we only need to consider words that are either one charcter less, the same, or more
                    if($word === $this->word) {
                        continue;
                    }
                    if (
                        !($index === $this->length)
                        && !($index - 1 === $this->length)
                        && !($index + 1 === $this->length)
                    ) {
                        continue;
                    }
                    // if index === then we can check for hamming distance of 1
                    if ($index === $this->length) {
                        $faults = 0;
                        foreach (mb_str_split($word) as $i => $letter) {
                            if ($letter !== $this->word[$i]) {
                                $faults++;
                            }
                        }
                        if ($faults > 1) {
                            continue;
                        }
                        $this->friends[] = $word;
                    }
                    // if index !== then we allow for one difference in the letters
                    $smallerWord = strlen($word) < $this->length ? $word : $this->word;
                    $biggerWord = strlen($word) > $this->length ? $word : $this->word;

                    $jumps = 0;
                    $i = 0; // Pointer for $smallerWord
                    $j = 0; // Pointer for $biggerWord

                    $smallerLen = strlen($smallerWord);
                    $biggerLen = strlen($biggerWord);

                    while ($i < $smallerLen && $j < $biggerLen) {
                        if ($smallerWord[$i] !== $biggerWord[$j]) {
                            $jumps++;
                            $j++; // Move only the pointer of the bigger word to "skip" the difference

                            if ($jumps > 1) {
                                break; // If more than one letter is different, stop early
                            }
                        } else {
                            // If letters match, move both pointers
                            $i++;
                            $j++;
                        }
                    }

                    // If there is exactly one difference, $jumps should be 1
                    if ($jumps === 1) {
                        $this->friends[] = $word;
                    }
                }
            }
        }
    }

    public function writeFriends(): void
    {
        // we will now write to file this words map to all of its friends
        $jsonEncoded = json_encode($this->friends);
        $line = "\"{$this->word}\": {$jsonEncoded}," . PHP_EOL;
        fwrite(self::$resource, $line);
    }
}