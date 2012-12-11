angular.module('filters', ['ngResource', 'ngCookies']).
  filter('groupBy', function() {

        function getValue(object, path) {
            var path_elements = path.split('.');
            for (var i = 0; i < path_elements.length; i++) {
                object = object[path_elements[i]];
            }
            return object;
        }

        function getKey(item, expression) {
            var returnValue = "";
            for (var i = 1; i < expression.length; i++) {
                returnValue = returnValue + "#" + getValue(item, expression[i]);
            }
            return returnValue;
        };

        function setValue(target, path, value) {
            var path_elements = path.split('.');
            for (var i = 0; i < path_elements.length -1; i++) {
                if (!target[path_elements[i]]) {
                    target[path_elements[i]] = {};
                }
                target = target[path_elements[i]];
            }
            target[path_elements[path_elements.length -1]] = value;
        }

        return function(data) {

            var groupsHash = {};
            var groupsArray = [];
            for (var i=0; i < data.length; i++) {
                var groupByKey = getKey(data[i], arguments);
                if (groupsHash[groupByKey]==undefined) {
                    groupsHash[groupByKey] = []
                    var groupObject = {};
                    for (var j = 1; j < arguments.length; j++) {
                        setValue(groupObject, arguments[j], getValue(data[i],arguments[j]));
                    }
                    groupObject['values'] = groupsHash[groupByKey];
                    groupsArray.push(groupObject);
                };
                groupsHash[groupByKey].push(data[i])
            }
          return groupsArray;
        }
    });

