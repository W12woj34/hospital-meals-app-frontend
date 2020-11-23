'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">hospital-meals-app-frontend documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-0df2a94ecda4d72dcf0d12873e7f86df"' : 'data-target="#xs-components-links-module-AppModule-0df2a94ecda4d72dcf0d12873e7f86df"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-0df2a94ecda4d72dcf0d12873e7f86df"' :
                                            'id="xs-components-links-module-AppModule-0df2a94ecda4d72dcf0d12873e7f86df"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link">AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/KitchenDietitianModule.html" data-type="entity-link">KitchenDietitianModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-KitchenDietitianModule-a7d54e1e3bdeee9120b6c6ba00bbaf20"' : 'data-target="#xs-components-links-module-KitchenDietitianModule-a7d54e1e3bdeee9120b6c6ba00bbaf20"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-KitchenDietitianModule-a7d54e1e3bdeee9120b6c6ba00bbaf20"' :
                                            'id="xs-components-links-module-KitchenDietitianModule-a7d54e1e3bdeee9120b6c6ba00bbaf20"' }>
                                            <li class="link">
                                                <a href="components/KitchenMainComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">KitchenMainComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/LoginModule.html" data-type="entity-link">LoginModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-LoginModule-f1b61ee12b0131f5352e5406aed0ca61"' : 'data-target="#xs-components-links-module-LoginModule-f1b61ee12b0131f5352e5406aed0ca61"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-LoginModule-f1b61ee12b0131f5352e5406aed0ca61"' :
                                            'id="xs-components-links-module-LoginModule-f1b61ee12b0131f5352e5406aed0ca61"' }>
                                            <li class="link">
                                                <a href="components/LoginSiteComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LoginSiteComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-LoginModule-f1b61ee12b0131f5352e5406aed0ca61"' : 'data-target="#xs-injectables-links-module-LoginModule-f1b61ee12b0131f5352e5406aed0ca61"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-LoginModule-f1b61ee12b0131f5352e5406aed0ca61"' :
                                        'id="xs-injectables-links-module-LoginModule-f1b61ee12b0131f5352e5406aed0ca61"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>AuthService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/MaterialModule.html" data-type="entity-link">MaterialModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/PatientMovementModule.html" data-type="entity-link">PatientMovementModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-PatientMovementModule-5f4fbc27d7243ab11fcd15aa79aea8a5"' : 'data-target="#xs-components-links-module-PatientMovementModule-5f4fbc27d7243ab11fcd15aa79aea8a5"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-PatientMovementModule-5f4fbc27d7243ab11fcd15aa79aea8a5"' :
                                            'id="xs-components-links-module-PatientMovementModule-5f4fbc27d7243ab11fcd15aa79aea8a5"' }>
                                            <li class="link">
                                                <a href="components/MovementMainComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MovementMainComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PatientMovementAddWorkerComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PatientMovementAddWorkerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PatientMovementLogsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PatientMovementLogsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PatientMovementWorkerDetailsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PatientMovementWorkerDetailsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PatientMovementWorkerPasswordChangeComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PatientMovementWorkerPasswordChangeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PatientMovementWorkersComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PatientMovementWorkersComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ToolsModule.html" data-type="entity-link">ToolsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ToolsModule-fc67bdfe54212655eb2ee113b0902167"' : 'data-target="#xs-components-links-module-ToolsModule-fc67bdfe54212655eb2ee113b0902167"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ToolsModule-fc67bdfe54212655eb2ee113b0902167"' :
                                            'id="xs-components-links-module-ToolsModule-fc67bdfe54212655eb2ee113b0902167"' }>
                                            <li class="link">
                                                <a href="components/ChangePersonDataComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ChangePersonDataComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ConfirmDialogComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ConfirmDialogComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PasswordChangeComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PasswordChangeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TopBarComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TopBarComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/WardDietitianModule.html" data-type="entity-link">WardDietitianModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-WardDietitianModule-2769f8dea558e96ce3f23e6ddadc8f71"' : 'data-target="#xs-components-links-module-WardDietitianModule-2769f8dea558e96ce3f23e6ddadc8f71"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-WardDietitianModule-2769f8dea558e96ce3f23e6ddadc8f71"' :
                                            'id="xs-components-links-module-WardDietitianModule-2769f8dea558e96ce3f23e6ddadc8f71"' }>
                                            <li class="link">
                                                <a href="components/DietitianAddRestrictionComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DietitianAddRestrictionComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DietitianMainComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DietitianMainComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DietitianPatientDetailsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DietitianPatientDetailsComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/WardNurseModule.html" data-type="entity-link">WardNurseModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-WardNurseModule-635f66f2c23e4067b19626f1c2a9424e"' : 'data-target="#xs-components-links-module-WardNurseModule-635f66f2c23e4067b19626f1c2a9424e"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-WardNurseModule-635f66f2c23e4067b19626f1c2a9424e"' :
                                            'id="xs-components-links-module-WardNurseModule-635f66f2c23e4067b19626f1c2a9424e"' }>
                                            <li class="link">
                                                <a href="components/NurseMainComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NurseMainComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NurseMealsOrdersComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NurseMealsOrdersComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NursePatientDetailsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NursePatientDetailsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NursePatientRegistrationComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NursePatientRegistrationComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/BaseService.html" data-type="entity-link">BaseService</a>
                            </li>
                            <li class="link">
                                <a href="classes/BaseSpecificationService.html" data-type="entity-link">BaseSpecificationService</a>
                            </li>
                            <li class="link">
                                <a href="classes/Page.html" data-type="entity-link">Page</a>
                            </li>
                            <li class="link">
                                <a href="classes/Pageable.html" data-type="entity-link">Pageable</a>
                            </li>
                            <li class="link">
                                <a href="classes/Sort.html" data-type="entity-link">Sort</a>
                            </li>
                            <li class="link">
                                <a href="classes/Tokens.html" data-type="entity-link">Tokens</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link">AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DietaryRestrictionService.html" data-type="entity-link">DietaryRestrictionService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DietitianService.html" data-type="entity-link">DietitianService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DietService.html" data-type="entity-link">DietService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/EmployeeService.html" data-type="entity-link">EmployeeService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/EventService.html" data-type="entity-link">EventService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LoginService.html" data-type="entity-link">LoginService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LogService.html" data-type="entity-link">LogService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MainKitchenDietitianService.html" data-type="entity-link">MainKitchenDietitianService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MealService.html" data-type="entity-link">MealService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MealTypeService.html" data-type="entity-link">MealTypeService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/OrderService.html" data-type="entity-link">OrderService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/OrderStatusService.html" data-type="entity-link">OrderStatusService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PatientDietService.html" data-type="entity-link">PatientDietService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PatientMovementService.html" data-type="entity-link">PatientMovementService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PatientService.html" data-type="entity-link">PatientService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PersonService.html" data-type="entity-link">PersonService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ReportService.html" data-type="entity-link">ReportService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RestrictionStatusService.html" data-type="entity-link">RestrictionStatusService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/StayService.html" data-type="entity-link">StayService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/WardNurseService.html" data-type="entity-link">WardNurseService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/WardService.html" data-type="entity-link">WardService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interceptors-links"' :
                            'data-target="#xs-interceptors-links"' }>
                            <span class="icon ion-ios-swap"></span>
                            <span>Interceptors</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="interceptors-links"' : 'id="xs-interceptors-links"' }>
                            <li class="link">
                                <a href="interceptors/TokenInterceptor.html" data-type="entity-link">TokenInterceptor</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/DietitianGuard.html" data-type="entity-link">DietitianGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/KitchenGuard.html" data-type="entity-link">KitchenGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/MovementGuard.html" data-type="entity-link">MovementGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/NurseGuard.html" data-type="entity-link">NurseGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/Diet.html" data-type="entity-link">Diet</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DietaryRestriction.html" data-type="entity-link">DietaryRestriction</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Dietitian.html" data-type="entity-link">Dietitian</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Employee.html" data-type="entity-link">Employee</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/EmployeeData.html" data-type="entity-link">EmployeeData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Event.html" data-type="entity-link">Event</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Log.html" data-type="entity-link">Log</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Login.html" data-type="entity-link">Login</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MainKitchenDietitian.html" data-type="entity-link">MainKitchenDietitian</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Meal.html" data-type="entity-link">Meal</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MealDemand.html" data-type="entity-link">MealDemand</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MealType.html" data-type="entity-link">MealType</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Order.html" data-type="entity-link">Order</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/OrderStatus.html" data-type="entity-link">OrderStatus</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PasswordChangeConfirm.html" data-type="entity-link">PasswordChangeConfirm</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PasswordChangeForce.html" data-type="entity-link">PasswordChangeForce</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Patient.html" data-type="entity-link">Patient</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PatientData.html" data-type="entity-link">PatientData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PatientDiet.html" data-type="entity-link">PatientDiet</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PatientMealOrder.html" data-type="entity-link">PatientMealOrder</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PatientMovement.html" data-type="entity-link">PatientMovement</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Person.html" data-type="entity-link">Person</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Resource.html" data-type="entity-link">Resource</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RestrictionStatus.html" data-type="entity-link">RestrictionStatus</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Stay.html" data-type="entity-link">Stay</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/User.html" data-type="entity-link">User</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserData.html" data-type="entity-link">UserData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Ward.html" data-type="entity-link">Ward</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/WardNurse.html" data-type="entity-link">WardNurse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Zamowienia.html" data-type="entity-link">Zamowienia</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});