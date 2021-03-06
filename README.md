# H5P content type for interactive texts

## Use cases

### Content creator

* The creator can enter formatted HTML texts. (done)
* The creator can mark words which link to dictionary entries (dictionary identifier, optional: headword). (done)
* The creator can annotate words with explanations. (done)
* The creator can enable machine pronunciation of clickable expressions and set the language of the text. 
* The creator can add dictionaries to a list of dictionaries to be used in the links in the text (identifier, selection of built-in dictionaries, custom dictionary links).
* The creator can add references to the document's source (URL, autor, title, date, ...)
* The creator can mark passages of the text as clipped. (done)
* The creator can add images, videos or audio recording above the text.
* The creator can toggle a setting which specifies that the user can look up any (unannotated) word in the default dictionary by clicking/tapping on it. (done)
* The creator can specify how dictionary links should be opened (iframe with source reference, same window, new tab, popup)
* The creator can set an option which allows users to hide all paragraphs, also those that aren't clipped.

### User

* The user can view the formatted text. (done)
* The user can see the image or play the video or audio recording.
* The user can see which expressions are annotated or have links to dictionaries. (done 1/2)
* The user can click or tap on expressions to see the annotation / follow the links. (done)
* If an annotation includes pronunciation it is automatically played.
* The user can see that passages are clipped. (done 1/2)
* The user can open clipped passages and close them again. (done 1/2)
* The user can click on the source reference to follow the link.
* If configured, the user can click on any (unannotated) word to open the link to the default dictionary for this word.

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

## Running

``npm install`` Fetches dependencies.
``npm build`` Compiles TypeScript to ESScript and packs everything into one file with webpack.
``npm dist`` Copies all required files to the 'dist' directory.
``npm deploy`` Copies the 'dist' directory to the desination specified in package.json

## Architecture

The project is built in a MVC-style architecture and uses JQuery to create and modify HTML and to wire events to the controller.
