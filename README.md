# space-align-format

https://marketplace.visualstudio.com/items?itemName=matsuyoido-kanro.space-align-format

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
12 + 34 + 5 + 6 = 46 + 11
```

After:
```
     123 + 34   + 56 = 213
     12  + 345  + 6  = 363
           1234 + 56 = 1290
12 + 34  + 5    + 6  = 46   + 11
```

#### Example2( input「=」 & input「    」 )

Before:
```
123 + 34 + 56 = 213
12 + 345 + 6 = 363
1234 + 56 = 1290
12 + 34 + 5 + 6 = 46 + 11
```

After:
```
         123 + 34   + 56 = 213
         12  + 345  + 6  = 363
               1234 + 56 = 1290
    12 + 34  + 5    + 6  = 46   + 11
```

### 5. Left-align a word relative to a character in the selected line

#### Step
* How1
    1. select multiple line.
    1. Right click in selected range.
    1. click 「Space by center character all」
* How2
    1. select multiple line.
    1. Ctrl + Shift + P
    1. input & select「Format: Space by center character」
    1. Input the word that you want to center.
    1. (Optional) Input the word that you want to insert the beginning of the line.
        - If you don't need it, enter 「Escape key」 or 「Enter key」

#### Example( 2~3 line selected. )

Before:
```
123 + 34 + 56 = 213
12 + 345 + 6 = 363
1234 + 56 = 1290
12 + 34 + 5 + 6 = 46 + 11
```

After:
```
123 + 34 + 56 = 213
12 + 345  + 6  = 363
     1234 + 56 = 1290
12 + 34 + 5 + 6 = 46 + 11
```

### 6. Left-align a word relative to a character(left only)

#### Step
1. Ctrl + Shift + P
1. input & select「Format: Space by center character(left only)」
1. Input the word that you want to center.
1. (Optional) Input the word that you want to insert the beginning of the line.
    - If you don't need it, enter 「Escape key」 or 「Enter key」

#### Example1( input「=」 & Escape )

Before:
```
123 + 34 + 56 = 213
12 + 345 + 6 = 363
1234 + 56 = 1290
12 + 34 + 5 + 6 = 46 + 11
```

After:
```
     123 + 34   + 56 = 213
     12  + 345  + 6  = 363
           1234 + 56 = 1290
12 + 34  + 5    + 6  = 46 + 11
```

#### Example2( input「=」 & input「    」 )

Before:
```
123 + 34 + 56 = 213
12 + 345 + 6 = 363
1234 + 56 = 1290
12 + 34 + 5 + 6 = 46 + 11
```

After:
```
         123 + 34   + 56 = 213
         12  + 345  + 6  = 363
               1234 + 56 = 1290
    12 + 34  + 5    + 6  = 46 + 11
```

### 7. Left-align a word relative to a character in the selected line(left only)

#### Step
* How1
    1. select multiple line.
    1. Right click in selected range.
    1. click 「Space by center character(left only)」
* How2
    1. select multiple line.
    1. Ctrl + Shift + P
    1. input & select「Format: Space by center character(left only)」
    1. Input the word that you want to center.
    1. (Optional) Input the word that you want to insert the beginning of the line.
        - If you don't need it, enter 「Escape key」 or 「Enter key」

#### Example( 2~3 line selected. )

Before:
```
123 + 34 + 56 = 213
12 + 345 + 6 = 363
1234 + 56 = 1290
12 + 34 + 5 + 6 = 46 + 11
```

After:
```
123 + 34 + 56 = 213
12 + 345  + 6  = 363
     1234 + 56 = 1290
12 + 34 + 5 + 6 = 46 + 11
```

## Release Notes

Please look at [CHANGELOG.md](./CHANGELOG.md).


