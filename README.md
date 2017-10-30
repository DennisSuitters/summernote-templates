# summernote-newpage
A plugin for the [Summernote](https://github.com/summernote/summernote/) WYSIWYG editor.

summernote-newpage will clear the current editor contents.

### Installation

#### 1. Include JS

Include the following code after Summernote:

```html
<script src="summernote-newpage.js"></script>
```

#### 2. Supported languages

Currently available in English!

#### 3. Summernote options

````javascript
$('.summernote').summernote({
    toolbar:[
        ['custom',['newpage']], // Custom Button
        ['style',['style']],
        ['font',['bold','italic','underline','clear']],
        ['fontname',['fontname']],
        ['color',['color']],
        ['para',['ul','ol','paragraph']],
        ['height',['height']],
        ['table',['table']],
        ['insert',['media','link','hr']],
        ['view',['fullscreen','codeview']],
        ['help',['help']]
    ],
});
````

#### 4. Check out our other Summernote Plugins via our main Github page.
- [Diemen Design](https://github.com/DiemenDesign/)

#### TODO:
- Add Custom Templates.
