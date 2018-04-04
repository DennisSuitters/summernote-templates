<?php
echo ('<ul>'.PHP_EOL);
foreach (glob(dirname(__FILE__).DIRECTORY_SEPARATOR."*.{html}", GLOB_BRACE) as $filename) {
    echo '<li><a href="'.basename($filename).'">'.basename($filename).'</a></li>'.PHP_EOL;
}
echo ('</ul>'.PHP_EOL);
