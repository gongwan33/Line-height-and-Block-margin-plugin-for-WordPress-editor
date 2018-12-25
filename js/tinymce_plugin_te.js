(function () {
    tinymce.PluginManager.add('my_button_script', function (ed, url, $) {
        ed.on('init', function () {
            ed.formatter.register({
                lineheight: {inline: 'span', styles: {'line-height': '%value'}}
            });
            ed.formatter.register({
                marginbottom: {block: 'div', styles: {'margin-bottom': '%value'}}
            });
        });

        ed.addButton('sel_line_height', function() {
            var items = [], defaultLineHeightFormats = '10pt 14pt 16pt 18pt 20pt 24pt 30pt 36pt';
            var lineheight_formats = ed.settings.lineheight_formats || defaultLineHeightFormats;
            lineheight_formats.split(' ').forEach(function(item) {
                var text = item, value = item;
                var values = item.split('=');
                if (values.length > 1) {
                    text = values[0];
                    value = values[1];
                }
                items.push({text: text, value: value});
            });
            return {
                type: 'listbox',
                text: 'Line Height',
                tooltip: 'Line Height',
                values: items,
                fixedWidth: true,
                onPostRender: function() {
                    var self = this;
                    ed.on('nodeChange', function(e) {
                        var formatName = 'lineheight';
                        var formatter = ed.formatter;
                        var value = null;
                        e.parents.forEach(function(node) {
                            items.forEach(function(item) {
                                if (formatName) {
                                    if (formatter.matchNode(node, formatName, {value: item.value})) {
                                        value = item.value;
                                    }
                                } else {
                                    if (formatter.matchNode(node, item.value)) {
                                        value = item.value;
                                    }
                                }
                                if (value) {
                                    return false;
                                }
                            });
                            if (value) {
                                return false;
                            }
                        });
                        self.value(value);
                    });
                },
                onselect: function(e) {
                    ed.formatter.apply('lineheight', {value : this.value()});
                    //var selected_text = ed.selection.getContent();
                    //var return_text = '';
                    //return_text = '<span style="line-height:' + this.value() + '">' + selected_text + '</span>';
                    //ed.execCommand('mceInsertContent', 0, return_text);
                }
            };
        });

        ed.addButton('sel_block_margin', function() {
            var items = [], defaultLineHeightFormats = '0pt 4pt 8pt 10pt 14pt 16pt 18pt 20pt 24pt 30pt 36pt';
            var lineheight_formats = ed.settings.lineheight_formats || defaultLineHeightFormats;
            lineheight_formats.split(' ').forEach(function(item) {
                var text = item, value = item;
                // Allow text=value for line-height formats
                var values = item.split('=');
                if (values.length > 1) {
                    text = values[0];
                    value = values[1];
                }
                items.push({text: text, value: value});
            });
            return {
                type: 'listbox',
                text: 'Block Margin',
                tooltip: 'Block Margin',
                values: items,
                fixedWidth: true,
                onPostRender: function() {
                    var self = this;
                    ed.on('nodeChange', function(e) {
                        var formatName = 'linemargin';
                        var formatter = ed.formatter;
                        var value = null;
                        e.parents.forEach(function(node) {
                            items.forEach(function(item) {
                                if (formatName) {
                                    if (formatter.matchNode(node, formatName, {value: item.value})) {
                                        value = item.value;
                                    }
                                } else {
                                    if (formatter.matchNode(node, item.value)) {
                                        value = item.value;
                                    }
                                }
                                if (value) {
                                    return false;
                                }
                            });
                            if (value) {
                                return false;
                            }
                        });
                        self.value(value);
                    });
                },
                onselect: function(e) {
                    ed.formatter.apply('marginbottom', {value : this.value()});
                    //var selected_text = ed.selection.getContent();
                    //var return_text = '';
                    //return_text = '<div style="margin-bottom:' + this.value() + '">' + selected_text + '</div>';
                    //ed.execCommand('mceInsertContent', 0, return_text);
                }
            };
        });

    });
})();

