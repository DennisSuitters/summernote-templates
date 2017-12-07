# summernote-templates
A plugin for the [Summernote](https://github.com/summernote/summernote/) WYSIWYG editor.

summernote-templates adds the ability to select page layout templates, or with the blocks button add custom template content blocks.

The plugin in comes with some page templates, and some block templates (for Bootstrap 3). You can however create your own and add them into the existing folders that contain the page, and block templates.

### Installation

#### 1. Include JS

Include the following code after Summernote:

```html
<script src="summernote-templates.js"></script>
```

#### 2. Supported languages

Currently available in English!

#### 3. Summernote options

````javascript
$('.summernote').summernote({
    toolbar:[
        ['custom',['pageTemplates','blocks']], // Custom Buttons
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
    templates:{
        templates: 'page-templates/', // The folder where the templates are stored.
        insertDetails: false, // true|false This toggles whether the below options are automatically filled when inserting the chosen page template.
        dateFormat:    'longDate',
        yourName:      'Your Name',
        yourTitle:     'Your Title',
        yourCompany:   'Your Comapny',
        yourPhone:     'Your Phone',
        yourAddress:   'Your Address',
        yourCity:      'Your City',
        yourState:     'Your State',
        yourCountry:   'Your Country',
        yourPostcode:  'Your Postcode',
        yourEmail:     'your@email.com'
    },
    blocks:{
        templates: 'bootstrap-templates/' // The folder where the Block Templates are stored
    }
});
````

#### 4. Check out our other Summernote Plugins via our main Github page.
- [Diemen Design](https://github.com/DiemenDesign/)
