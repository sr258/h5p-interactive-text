# H5P content type for interactive texts

## Use cases

### Content creator

* The creator can enter formatted HTML texts.
* The creator can mark words which link to dictionary entries (dictionary identifier, optional: headword).
* The creator can annotate words with explanations.
* The creator can enable machine pronunciation of clickable expressions and set the language of the text. 
* The creator can add dictionaries to a list of dictionaries to be used in the links in the text (identifier, selection of built-in dictionaries, custom dictionary links).
* The creator can add references to the document's source (URL, autor, title, date, ...)
* The creator can mark passages of the text as clipped.
* The creator can add images, videos or audio recording above the text.
* [optional] The creator can add named versions of the text.
* [optional] The creator can mark expressions of the text and specify alternatives for them (for a version).
* The creator can toggle a setting which specifies that the user can look up any (unannotated) word in the default dictionary by clicking/tapping on it.
* The creator can specify how dictionary links should be opened (iframe with source reference, same window, new tab, popup)

### User

* The user can view the formatted text.
* The user can see the image or play the video or audio recording.
* The user can see which expressions are annotated or have links to dictionaries.
* The user can click or tap on expressions to see the annotation follow the links. If an annotation includes pronunciation it is automatically played.
* The user can see that passages are clipped.
* The user can open clipped passages and close them again.
* The user can click on the source reference to follow the link.
* If configured, the user can click on any (unannotated) word to open the link to the default dictionary for this word.
* [optional] The user can choose which version to read.

## Syntax
| Syntax in text                         | remarks                                                                                                   |
|----------------------------------------|-----------------------------------------------------------------------------------------------------------|
| abc def ghi jkl (= explanation text)   | The word in front of the of the brackets (jkl) is clickable.                                              |
| abc def ghi_jkl (= explanation text)   | The words in front of the the brackets (ghi jkl) are clickable. The underscore is replaced by whitespace. |
| abc def (ghi jkl) (= explanation text) | The words in front of the the brackets (ghi jkl) are clickable. The brackets are removed.                 |
| abc def ghi jkl (-> dict1)             | The word in front of the brackets is looked up in the dictionary. The word itself (jkl) is used as headword. |
| abc def ghi_jkl (-> dict1)             | see above                                                                                                 |
| abc def (ghi jkl) (-> dict1)           | see above                                                                                                 |
| abc def ghi jkl (->dict1: hji klm)     | The word in front of the brackets is clickable and links to a dictionary. The headword is the expression in the brackets (hji klm) |
| abc def ghi jkl (->dict1: hji, noun)   | The word in front of the brackets is clickable and links to a dictionary. The headword is the expression in the brackets (hji). The last word separated by a comma is the part of speech. |
| [...] abc def ghi [/...]               | The text between the markup is snipped.                                                                   |