// multiple search input

var defaultChosenOptions = {
  no_results_text: "Sem resultados para ",
  width: '231px',
  disable_search: true,
  placeholder_text_multiple: stringUtils.toUtf8("Selecione as opções"),
  placeholder_text_single: stringUtils.toUtf8("Selecione uma opção")
};

var defaultMultipleSearchOptions = {
  // options that cannot be overwritten

  get       : function(optionName) { return optionsUtils.get(this, optionName) },
  mergeWith : function(options) {
    options                   = optionsUtils.merge(this, options);
    options.chosenOptions = optionsUtils.merge(defaultChosenOptions, options.chosenOptions);

    return options;
  },

  // options that must be overwritten
  objectName    : undefined,
  attrName      : undefined,
  searchPath    : undefined,

  // options that can be overwritten
  // placeholder   : safeUtf8Decode('Selecione as opções')
};

var multipleSearch = {
  setup : function(options) {
    options = defaultMultipleSearchOptions.mergeWith(options);
    options.chosenOptions.url = options.get('searchPath');

    var attrName = options.get('attrName');
    if (attrName) { attrName = '_' + attrName; }

    var $input  = $j(buildId(options.get('objectName') + attrName));

    // fixups for chosen
    $input.attr('multiple', '');

    var objectName = options.get('objectName');

    // jquery scope
    $input.chosen(options.get('chosenOptions'));

    // fixup to API receive all ids
    $j("#"+objectName).attr('name', $j("#"+objectName).attr('name') + '[]');
  }
};

var multipleSearchHelper = {
  setup : function(objectName, attrName, searchPath, searchResourceOptions) {
    var defaultOptions = {
      searchPath : searchPath,
      objectName : objectName,
      attrName   : attrName
    };

    var options = optionsUtils.merge(defaultOptions, searchResourceOptions);
    multipleSearch.setup(options);
  }
};

var updateChozen = function(input, values){
  $j.each(values, function(index, value){
    input.append('<option value="' + index + '"> ' + value + '</option>');
  });
  input.trigger("chosen:updated");
  input.trigger("liszt:updated");
};

var clearValues = function(input){
  input.empty();
  input.trigger("chosen:updated");
}