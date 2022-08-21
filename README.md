# space-align-format

## Features

* Adjust the display of each row.
* Align the text of each selected word to the left.



## Extension Settings

Don't need anything.



## Usage

Requirement: open file & activate.


### 1. Left alignment of each word

#### Step
* How1
    1. Right click in file.
    1. click 「Space by columns」
* How2
    1. Ctrl + Shift + P
    1. input & select「Format: Space by columns」

#### Example

Before:
```
abcdef ghijk lmnop qr stuv
abcd efgh ijkl mnop rstuv
abc def ghi jklmn o pqr st
abc def gh ijklmn op qr st
```

After:
```
abcdef ghijk lmnop qr     stuv
abcd   efgh  ijkl  mnop   rstuv
abc    def   ghi   jklmn  o     pqr st
abc    def   gh    ijklmn op    qr  st
```



### 2. Align each word in the selected line to the left

#### Step
* How1
    1. select multiple line.
    1. Right click in selected range.
    1. click 「Space by columns」
* How2
    1. select multiple line.
    1. Ctrl + Shift + P
    1. input & select「Format: Space by columns」

#### Example( 2~3 line selected. )

Before:
```
abcdef ghijk lmnop qr stuv
abcd efgh ijkl mnop rstuv
abc def ghi jklmn o pqr st
abc def gh ijklmn op qr st
```

After:
```
abcdef ghijk lmnop qr stuv
abcd efgh ijkl mnop  rstuv
abc  def  ghi  jklmn o     pqr st
abc def gh ijklmn op qr st
```

### 3. Categorize by the number of words on each line. Align words to the left on each categorized line.

#### Step
1. Ctrl + Shift + P
1. input & select「Format: Space by columns group」

#### Example

Before:
```
abcdef ghijk lmnop qr stuv
abcd efgh ijkl mnop rstuv
abc def ghi jklmn o pqr st
abc def gh ijklmn op qr st
```

After:
```
abcdef ghijk lmnop qr   stuv
abcd   efgh  ijkl  mnop rstuv
abc def ghi jklmn  o  pqr st
abc def gh  ijklmn op qr  st
```

### 4. Left-align a word relative to a character

#### Step
1. Ctrl + Shift + P
1. input & select「Format: Space by center character」
1. Input the word that you want to center.
1. (Optional) Input the word that you want to insert the beginning of the line.
    - If you don't need it, enter 「Escape key」 or 「Enter key」

#### Example1( input「=」 & Escape )

Before:
```
123 + 34 + 56 = 213
12 + 345 + 6 = 363
1234 + 56 = 1290
12 + 34 + 5 + 6 = 57
```

After:
```
     123 + 34   + 56 = 213
     12  + 345  + 6  = 363
           1234 + 56 = 1290
12 + 34  + 5    + 6  = 57
```

#### Example2( input「=」 & input「    」 )

Before:
```
123 + 34 + 56 = 213
12 + 345 + 6 = 363
1234 + 56 = 1290
12 + 34 + 5 + 6 = 57
```

After:
```
         123 + 34   + 56 = 213
         12  + 345  + 6  = 363
               1234 + 56 = 1290
    12 + 34  + 5    + 6  = 57
```


## Release Notes

### 1.0.0

Initial release.


