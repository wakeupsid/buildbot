define(
    [
        "dojo/store/Memory",
        "dojo/store/JsonRest", 
        "dojo/store/Cache",
        "dojo/json"
    ],
    function(Memory, JsonRest, Cache, JSON) {
        memoryStore = new Memory({});
        restStore = new JsonRest({target: "/api/v2/change/"});
        store = new Cache(restStore, memoryStore);
        function latestChange() {
            return 1;
        };

        latestReq = latestChange();

        return {
            JsonStore : store,
            loadSingleChange: function(){
                data = store.get(latestReq);
                latestReq++;
                return data;
            },
            loadMultipleChanges: function(count){
                data = store.query({}, 
                                   {start:latestReq,
                                    count:count});
                latestReq += count;
                return data;
            },
            loadAllChanges: function(){
                data = store.query();
                return data;
            },
        }
    });
