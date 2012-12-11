use strict';
describe('GroupByFilter', function() {
    beforeEach(module('aime'));

    var filter;

    beforeEach(inject(function($filter){
        filter = $filter('groupBy')
    }));

    it("should group by single attribute", function(){
        var data = [{role: 'staff', name: 'Nic'}, {role: 'staff', name: 'Josh'}, {role: 'client', name: 'Drew'}]
        expect(
            filter(data, 'role')
        ).toEqual(
            [
                {
                    role: 'staff',
                    values: [{role: 'staff', name: 'Nic'}, {role: 'staff', name: 'Josh'}]
                },
                {
                    role: 'client',
                    values: [{role: 'client', name: 'Drew'}]
                }
            ]
        );
    });

    it("should group by nested attribute", function(){
        var data = [{role: 'staff', name: {first: 'Nic', last: 'Snoek'}}, {role: 'dev', name: {first: 'Nic', last: 'Snoek'}}, {role: 'client', name: {first: 'Drew', last: 'Higgins'}}]
        expect(
            filter(data, 'name.first', 'name.last')
        ).toEqual(
            [
                {
                    name: {first: 'Nic', last: 'Snoek'},
                    values: [{role: 'staff', name: {first: 'Nic', last: 'Snoek'}}, {role: 'dev', name: {first: 'Nic', last: 'Snoek'}}]
                },
                {
                    name: {first: 'Drew', last: 'Higgins'},
                    values: [{role: 'client', name: {first: 'Drew', last: 'Higgins'}}]
                }
            ]
        );
    });

    it("should group by multiple attributes", function(){
        var data = [
            {role: 'staff', name: 'Nic', the: 'dev'},
            {role: 'staff', name: 'Josh', the: 'dev'},
            {role: 'client', name: 'Drew', the: 'man'},
            {role: 'staff', name: 'May', the: 'qa'}]
        expect(
            filter(data, 'role', 'the')
        ).toEqual(
            [
                {
                    role: 'staff',
                    the: 'dev',
                    values: [{role: 'staff', name: 'Nic', the: 'dev'}, {role: 'staff', name: 'Josh', the: 'dev'}]
                },
                {
                    role: 'client',
                    the: 'man',
                    values: [{role: 'client', name: 'Drew', the: 'man'}]
                },
                {
                    role: 'staff',
                    the: 'qa',
                    values: [{role: 'staff', name: 'May', the: 'qa'}]
                }
            ]
        );
    });

});

