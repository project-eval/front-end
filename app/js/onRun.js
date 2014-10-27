'use strict';

/**
 * @ngInject
 */
function onRun($rootScope, AppSettings, Auth, $state) {

	if(AppSettings.devMode === false) {
		$rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams) {
			if ( !( 'data' in toState ) || !( 'access' in toState.data )) {
				$rootScope.error = "Access undefined for this state";
				event.preventDefault();
			} else if (!Auth.authorize(toState.data.access)) {
				$rootScope.error = "Seems like you tried accessing a route you don't have access to...";
				event.preventDefault();

				if (Auth.isLoggedIn()) {
					$state.go('user.dashboard');
				} else {
					$rootScope.error = null;
					$state.go('public.login');
				}

			}
		});
	}

	// change page title based on state
	$rootScope.$on('$stateChangeSuccess', function(event, toState) {
		$rootScope.pageTitle = '';

		if ( toState.title ) {
			$rootScope.pageTitle += toState.url;
			$rootScope.pageTitle += ' \u2014 ';
		}

		$rootScope.pageTitle += AppSettings.appTitle;
	});

}

module.exports = onRun;
