require({
    packages: [{name: "lib", location: "/static/js/lib"}]
},
        [
            "lib/websocket",
            "lib/changes",
            "dojo/on",
            "dojo/dom",
            "dgrid/Grid",
            "dojo/_base/array",
            "dojo/dom-class",
            "dojo/dom-style",
        ],

        function(websocket, changes, on, dom, Grid, array, domClass, domStyle) {
            setTimeout(websocket.poll, 0);

            divs = [
                "changes_slider",
                "builders_slider",
                "buildslaves_slider",
                "masters_slider"
            ];
            
            array.forEach(divs, function(div, index){
                on(dom.byId(div), "click", function(event) {
                    array.forEach(divs, function(div, index){
                        domClass.remove(dom.byId(div), "slider_clicked");
                        content_div = div.split("_")[0];
                        domStyle.set(dom.byId(content_div), "display", "none");
                    });
                    current_node = dom.byId(div);
                    domClass.add(current_node, "slider_clicked");
                    content_div = div.split("_")[0];
                    domStyle.set(dom.byId(content_div), "display", "block");
                });
            });

            //Add onClick event for changes
            var changesButton = dom.byId("changesButton");
            var grid = new Grid({
                columns: {
                    changeid: "Change ID",
                    revision:
                    {label: "Revision",
                     sortable: false},
                    files: 
                    {label: "Files",
                     sortable: false},
                    comments:
                    {label: "Comments",
                     sortable: false}
                },
            }, "grid");
            grid_data = [];
            on(changesButton, "click", function(evt){
                data = changes.loadSingleChange();
                data.then(function(d) {
                    grid_data.push({
                        changeid: d.changeid,
                        revision: d.revision,
                        files: d.files,
                        comments: d.comments
                    });
                    grid.refresh();
                    grid.renderArray(grid_data);
                });
            });
        });
