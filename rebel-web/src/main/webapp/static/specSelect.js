/**
 * Created by bc27wo on 09/11/2016.
 */
'use strict';
var app = angular.module('visualApp.selection', []);

app.controller('specCtrl', ['$log', function($log){
    var vm = this;

    vm.specs = specs;
    vm.showSpec = showSpec;
    vm.selectedSpec = specs[0];

    function showSpec(currentState) {
        // $log.debug(specs);
        // $log.debug(specs[0]);
        $log.debug(vm.selectedSpec);
        if (currentState === undefined) {
            currentState = "state_init";
        }
        var svg = d3.select("svg");
        var g = (vm.selectedSpec !== undefined) ? SpecRenderer.render(vm.selectedSpec, currentState, svg) : SpecRenderer.render(noSpecFound, null, svg);
        g.initialPlacement($(graph));
    }
}]);



