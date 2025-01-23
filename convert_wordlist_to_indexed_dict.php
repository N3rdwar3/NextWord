<?php


$dict = [];
$wl = fopen("wordlist.txt", "r");
while (!feof($wl)) {
    $word = stream_get_line($wl, 100000, "\n");
    // in this list the first and last letter of each word is a "
    $word = trim($word, '"');
    // exclude all non a-z
    $wordReplaced = preg_replace('/[^a-z]/', '', $word);
    if($wordReplaced !== $word) {
        continue;
    }
    if(strlen($word) < 1 || strlen($word) > 9){
        continue;
    }
    // get first letter of word
    $fl = $word[0];
    // if this letter has no entries lets add it now
    if(!isset($dict[$fl])) {
        $dict[$fl] = [];
    }
    // if this length for this letter has no entries lets add it now
    // dont need mb here because these are all basic english ascii
    $lengthOfWord = strlen($word);
    if(!isset($dict[$fl][$lengthOfWord])) {
        $dict[$fl][$lengthOfWord] = [];
    }
    // this wordlist is in sorted order already so dont need to worry about a final sort on each section
    $dict[$fl][$lengthOfWord][] = $word;
}
fclose($wl);

$dictJson = json_encode($dict, JSON_THROW_ON_ERROR);

file_put_contents("public/wordlist.json", $dictJson);

