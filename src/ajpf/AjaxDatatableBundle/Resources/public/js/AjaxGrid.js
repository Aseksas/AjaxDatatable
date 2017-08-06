var AjaxGrid = function () {


    var initPickers = function () {
        //init date pickers
        $('.date-picker').datepicker({
            rtl: Metronic.isRTL(),
            autoclose: true
        });
    }

    var handleGrid = function(defaultParams) {
        var grid = new Datatable();
        grid.init({
            src: $('#'+defaultParams.name),
            gridName: defaultParams.name,
            loadingMessage: (typeof defaultParams.loadingMessage != 'undefined') ? defaultParams.loadingMessage : 'Loading',
            dataTable: {
                columnDefs: [
                    { targets: 'no-sort', orderable: false }
                ],
               "lengthMenu": [10, 25, 50, 100],
                "pageLength": (typeof defaultParams.length != 'undefined') ? defaultParams.length : 50, // default record count per page
                "ajax": {
                    "url": window.location.href,
                },
                "order": (typeof defaultParams.order != 'undefined') ? defaultParams.order : [[1, "asc"]] // set first column as a default sort by asc
            }
        });

        // handle group actionsubmit button click
        grid.getTableWrapper().on('click', '.table-group-action-submit', function (e) {
            e.preventDefault();

            var action = $(".table-group-action-input");
            //console.log(action.find('option[value="delete"]').data('confirm'));
            if (action.find('option[value="delete"]').data('confirm') ) {
                if(!confirm(action.find('option[value="delete"]').data('confirm'))) {
                    toastr['info']("Pasirinktas veiksmas buvo nepatvirtintas", "");
                    return false;
                }
            }

            if (action.val() != "" && grid.getSelectedRowsCount() >= 1) {
                grid.setAjaxParam("massActionName", action.val());
                grid.setAjaxParam("check", grid.getSelectedRows());

                grid.getDataTable().ajax.reload();
                grid.clearAjaxParams();
            } else if (action.val() == "") {

                toastr['error']("Pasirinkite veiksmÄ…, kurÄ¯ norite atlikti paÅ¾ymÄ—tiems Ä¯raÅ¡ams", "");

            } else if (!grid.getSelectedRowsCount()) {

                toastr['error']("PaÅ¾ymÄ—kite Ä¯raÅ¡us su kuriais norite atlikti pasirinkta veiksmÄ…", "");

            }
        });
    }

    return {

        //main function to initiate the module
        init: function (defaultParams) {

            handleGrid(defaultParams);
            //initPickers();

        }

    };

}();