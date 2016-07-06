var specJsonStr='[' +
'	{' +
'		"fqn":"booking.sepa.dd.OnUsDebitBooking", ' +
'		"name":"OnUsDebitBooking",' +
'		"documentation":"",' +
'		"modifier":"",' +
'		"inheritsFrom": {"name":"DebitBooking", "url":"booking.sepa.dd.DebitBooking"},' +
'		"extendedBy":[],' +
'		"fields":[{"name":"amount", "type":"Money"},' +
'		          {"name":"creditor", "type":"BusinessCurrentAccount"},' +
'		          {"name":"settlementDate", "type":"Date"},' +
'		          {"name":"debtor", "type":"CurrentAccount"},' +
'		          {"name":"creationDate", "type":"Date"},' +
'		          {"name":"id", "type":"Integer"}],' +
'		"events":[{' +
'		          	"id": "event_initialized_book_booked",' +
'		          	"label": "book",' +
'		             "doc": "",' +
'		          	"config": [],' +
'		           	"params": [],' +
'		           	"preconditions": [{"code":"this.settlementDate == now;"},{"doc":"The customer can not be \'onder curatele\'", "code":"not Customer[this.debtor] instate curatele"}],' +
'		           	"postconditions": [],' +
'		           	"sync": [{"code":"this.debtor.withdraw(this.amount);"},{"code":"SepaDirectDebitWashAccount.deposit(this.amount);"}]' +
'		          	},' +
'		          {' +
'		          	"id": "event_booked_finalize_irrevocable",' +
'		          	"label": "finalize",' +
'		             "doc": "",' +
'		          	"config": [],' +
'		           	"params": [],' +
'		           	"preconditions": [{"code":"after(13 Month, this.settlementDate);"}],' +
'		           	"postconditions": [],' +
'		           	"sync": []' +
'		          	},' +
'		          {' +
'		          	"id": "event_waitingForAdvice_denied_returned",' +
'		          	"label": "denied",' +
'		             "doc": "",' +
'		          	"config": [],' +
'		           	"params": [],' +
'		           	"preconditions": [{"code":"within3Target2Days(this.settlementDate);"}],' +
'		           	"postconditions": [],' +
'		           	"sync": [{"code":"BusinessCurrentAccount[this.creditor].forcedWithdraw(this.amount);"},{"code":"RevolvingWashAccount.deposit(this.amount);"}]' +
'		          	},' +
'		          {' +
'		          	"id": "event_initialized_cancel_canceled",' +
'		          	"label": "cancel",' +
'		             "doc": "",' +
'		          	"config": [],' +
'		           	"params": [],' +
'		           	"preconditions": [],' +
'		           	"postconditions": [],' +
'		           	"sync": [{"code":"BusinessCurrentAccount[this.creditor].forcedWithdraw(this.amount);"},{"code":"SepaDirectDebitWashAccount.deposit(this.amount);"}]' +
'		          	},' +
'		          {' +
'		          	"id": "event_waitingForAdvice_forcedReturn_returned",' +
'		          	"label": "forcedReturn",' +
'		             "doc": "",' +
'		          	"config": [],' +
'		           	"params": [],' +
'		           	"preconditions": [],' +
'		           	"postconditions": [],' +
'		           	"sync": [{"code":"BusinessCurrentAccount[this.creditor].forcedWithdraw(this.amount);"},{"code":"RevolvingWashAccount.deposit(this.amount);"}]' +
'		          	},' +
'		          {' +
'		          	"id": "event_revolving_bookAfterRevolve_booked",' +
'		          	"label": "bookAfterRevolve",' +
'		             "doc": "When revolving the following booking scheme is followed:\\n\\t\\t\\t| Creditor Account \\t| WASH SEPA DD \\t| WASH Revolve \\t| ISA BT \\t| Debtor Account \\n\\t--------|-------------------|---------------|---------------|-----------|---------------\\n\\tdebet\\t|\\t\\t\\t\\t\\t|\\t\\t\\t\\t|\\t\\t\\t\\t|\\t\\t\\t|\\tX\\n\\tcredit\\t|\\t\\t\\t\\t\\t|\\t\\t\\t\\t| X\\t\\t\\t\\t|\\t\\t\\t|",' +
'		          	"config": [],' +
'		           	"params": [],' +
'		           	"preconditions": [{"code":"this.settlementDate >= now;"},{"code":"this.settlementDate <= now + next3Target2Days(this.settlementDate);"}],' +
'		           	"postconditions": [],' +
'		           	"sync": [{"code":"CurrentAccount[this.debtor].withdraw(this.amount);"},{"code":"RevolvingWashAccount.deposit(this.amount);"}]' +
'		          	},' +
'		          {' +
'		          	"id": "event_booked_refundAfter8Weeks_refunded",' +
'		          	"label": "refundAfter8Weeks",' +
'		             "doc": "",' +
'		          	"config": [],' +
'		           	"params": [],' +
'		           	"preconditions": [{"code":"now >= this.settlementDate;"},{"code":"between(8 Week, 13 Month, now);"},{"code":"not initialized Mandate[this.creditor];"}],' +
'		           	"postconditions": [],' +
'		           	"sync": [{"code":"BusinessCurrentAccount[this.creditor].forcedWithdraw(this.amount);"},{"code":"CurrentAccount[this.debtor].forcedDeposit(this.amount);"}]' +
'		          	},' +
'		          {' +
'		          	"id": "event_booked_refundWithin8Weeks_refunded",' +
'		          	"label": "refundWithin8Weeks",' +
'		             "doc": "",' +
'		          	"config": [],' +
'		           	"params": [],' +
'		           	"preconditions": [{"code":"now >= this.settlementDate;"},{"code":"within(8 Week, now);"}],' +
'		           	"postconditions": [],' +
'		           	"sync": [{"code":"BusinessCurrentAccount[this.creditor].forcedWithdraw(this.amount);"},{"code":"CurrentAccount[this.debtor].forcedDeposit(this.amount);"}]' +
'		          	},' +
'		          {' +
'		          	"id": "event_waitingForAdvice_forceBooking_booked",' +
'		          	"label": "forceBooking",' +
'		             "doc": "",' +
'		          	"config": [],' +
'		           	"params": [],' +
'		           	"preconditions": [],' +
'		           	"postconditions": [],' +
'		           	"sync": [{"code":"CurrentAccount[this.debtor].forcedWithdraw(this.amount);"},{"code":"RevolvingWashAccount.deposit(this.amount);"}]' +
'		          	},' +
'		          {' +
'		          	"id": "event_initialized_needsAdvice_waitingForAdvice",' +
'		          	"label": "needsAdvice",' +
'		             "doc": "",' +
'		          	"config": [],' +
'		           	"params": [],' +
'		           	"preconditions": [{"code":"Customer[this.debtor] in {curatele} || CurrentAccount[this.debtor] in {blocked, blockedForDebit};"}],' +
'		           	"postconditions": [],' +
'		           	"sync": [{"code":"RevolvingWashAccount.withdraw(this.amount);"},{"code":"SepaDirectDebitWashAccount.deposit(this.amount);"}]' +
'		          	},' +
'		          {' +
'		          	"id": "event_initialized_revoke_revoked",' +
'		          	"label": "revoke",' +
'		             "doc": "",' +
'		          	"config": [],' +
'		           	"params": [],' +
'		           	"preconditions": [{"code":"this.settlementDate > now;"}],' +
'		           	"postconditions": [],' +
'		           	"sync": [{"code":"BusinessCurrentAccount[this.creditor].forcedWithdraw(this.amount);"},{"code":"SepaDirectDebitWashAccount.deposit(this.amount);"}]' +
'		          	},' +
'		          {' +
'		          	"id": "event_initialized_refuse_refused",' +
'		          	"label": "refuse",' +
'		             "doc": "",' +
'		          	"config": [],' +
'		           	"params": [],' +
'		           	"preconditions": [],' +
'		           	"postconditions": [],' +
'		           	"sync": [{"code":"BusinessCurrentAccount[this.creditor].forcedWithdraw(this.amount);"},{"code":"SepaDirectDebitWashAccount.deposit(this.amount);"}]' +
'		          	},' +
'		          {' +
'		          	"id": "event_initialized_reject_rejected",' +
'		          	"label": "reject",' +
'		             "doc": "",' +
'		          	"config": [],' +
'		           	"params": [],' +
'		           	"preconditions": [{"code":"this.settlementDate > now;"}],' +
'		           	"postconditions": [],' +
'		           	"sync": [{"code":"BusinessCurrentAccount[this.creditor].forcedWithdraw(this.amount);"},{"code":"SepaDirectDebitWashAccount.deposit(this.amount);"}]' +
'		          	},' +
'		          {' +
'		          	"id": "event_waitingForAdvice_return_returned",' +
'		          	"label": "return",' +
'		             "doc": "",' +
'		          	"config": [],' +
'		           	"params": [],' +
'		           	"preconditions": [{"code":"after3Target2Days(this.settlementDate);"}],' +
'		           	"postconditions": [],' +
'		           	"sync": [{"code":"BusinessCurrentAccount[this.creditor].forcedWithdraw(this.amount);"},{"code":"RevolvingWashAccount.deposit(this.amount);"}]' +
'		          	},' +
'		          {' +
'		          	"id": "event_init_create_initialized",' +
'		          	"label": "create",' +
'		             "doc": "",' +
'		          	"config": [],' +
'		           	"params": [{"name":"id", "type":"Integer"},{"name":"debtor", "type":"IBAN"},{"name":"creditor", "type":"IBAN"},{"name":"amount", "type":"Money"},{"name":"settlementDate", "type":"Date"}],' +
'		           	"preconditions": [{"code":"globalCredit > EUR 0.00;"},{"doc":"Only users with an Business Current Account can create Sepa DD payments", "code":"initialized BusinessCurrentAccount[creditor]"},{"doc":"The debtor account must be an ING account", "code":"initialized CurrentAccount[debtor]"},{"doc":"The debtor account must not be active in the OverstapService", "code":"not initialized OverstapService[debtor]"}],' +
'		           	"postconditions": [{"code":"new this.id == id;"},{"code":"new this.creditor == BusinessCurrentAccount[creditor];"},{"code":"new this.debtor == CurrentAccount[debtor];"},{"code":"new this.amount == amount;"},{"code":"new this.settlementDate == nextTarget2Day(settlementDate);"},{"doc":"The creation date D-1 will be effected from august 2016", "code":"new this.creationDate == previousTarget2Day(new this.settlementDate)"}],' +
'		           	"sync": []' +
'		          	},' +
'		          {' +
'		          	"id": "event_booked_reverse_reversed",' +
'		          	"label": "reverse",' +
'		             "doc": "",' +
'		          	"config": [],' +
'		           	"params": [],' +
'		           	"preconditions": [{"code":"now >= this.settlementDate;"},{"code":"beforeTarget2Day(5 Day, this.settlementDate, now);"}],' +
'		           	"postconditions": [],' +
'		           	"sync": [{"code":"BusinessCurrentAccount[this.creditor].forcedWithdraw(this.amount);"},{"code":"CurrentAccount[this.debtor].forcedDeposit(this.amount);"}]' +
'		          	},' +
'		          {' +
'		          	"id": "event_revolving_return_returned",' +
'		          	"label": "return",' +
'		             "doc": "",' +
'		          	"config": [],' +
'		           	"params": [],' +
'		           	"preconditions": [{"code":"after3Target2Days(this.settlementDate);"}],' +
'		           	"postconditions": [],' +
'		           	"sync": [{"code":"BusinessCurrentAccount[this.creditor].forcedWithdraw(this.amount);"},{"code":"RevolvingWashAccount.deposit(this.amount);"}]' +
'		          	},' +
'		          {' +
'		          	"id": "event_initialized_revolve_revolving",' +
'		          	"label": "revolve",' +
'		             "doc": "",' +
'		          	"config": [],' +
'		           	"params": [],' +
'		           	"preconditions": [{"code":"this.settlementDate == now;"}],' +
'		           	"postconditions": [],' +
'		           	"sync": [{"doc":"Debtor does not have enough balance", "code":"not CurrentAccount[this.debtor].withdraw(this.amount)"},{"code":"SepaDirectDebitWashAccount.deposit(this.amount);"},{"code":"RevolvingWashAccount.withdraw(this.amount);"}]' +
'		          	}],' +
'		"states":[{"id":"state_irrevocable", "label":"", "final": true},' +
'		          {"id":"state_booked", "label":"booked"},' +
'		          {"id":"state_reversed", "label":"", "final": true},' +
'		          {"id":"state_init", "label": "", "initial": true},' +
'		          {"id":"state_canceled", "label":"", "final": true},' +
'		          {"id":"state_refused", "label":"", "final": true},' +
'		          {"id":"state_returned", "label":"", "final": true},' +
'		          {"id":"state_revolving", "label":"revolving"},' +
'		          {"id":"state_rejected", "label":"", "final": true},' +
'		          {"id":"state_revoked", "label":"", "final": true},' +
'		          {"id":"state_initialized", "label":"initialized"},' +
'		          {"id":"state_waitingForAdvice", "label":"waitingForAdvice"},' +
'		          {"id":"state_refunded", "label":"", "final": true}],' +
'		"transitions":[{"from":"state_waitingForAdvice", "to":"state_booked", "via":"event_waitingForAdvice_forceBooking_booked"},' +
'		               {"from":"state_booked", "to":"state_irrevocable", "via":"event_booked_finalize_irrevocable"},' +
'		               {"from":"state_initialized", "to":"state_waitingForAdvice", "via":"event_initialized_needsAdvice_waitingForAdvice"},' +
'		               {"from":"state_initialized", "to":"state_canceled", "via":"event_initialized_cancel_canceled"},' +
'		               {"from":"state_initialized", "to":"state_revoked", "via":"event_initialized_revoke_revoked"},' +
'		               {"from":"state_init", "to":"state_initialized", "via":"event_init_create_initialized"},' +
'		               {"from":"state_booked", "to":"state_refunded", "via":"event_booked_refundWithin8Weeks_refunded"},' +
'		               {"from":"state_waitingForAdvice", "to":"state_returned", "via":"event_waitingForAdvice_denied_returned"},' +
'		               {"from":"state_waitingForAdvice", "to":"state_returned", "via":"event_waitingForAdvice_forcedReturn_returned"},' +
'		               {"from":"state_initialized", "to":"state_revolving", "via":"event_initialized_revolve_revolving"},' +
'		               {"from":"state_revolving", "to":"state_booked", "via":"event_revolving_bookAfterRevolve_booked"},' +
'		               {"from":"state_initialized", "to":"state_booked", "via":"event_initialized_book_booked"},' +
'		               {"from":"state_initialized", "to":"state_refused", "via":"event_initialized_refuse_refused"},' +
'		               {"from":"state_initialized", "to":"state_rejected", "via":"event_initialized_reject_rejected"},' +
'		               {"from":"state_booked", "to":"state_reversed", "via":"event_booked_reverse_reversed"},' +
'		               {"from":"state_waitingForAdvice", "to":"state_returned", "via":"event_waitingForAdvice_return_returned"},' +
'		               {"from":"state_booked", "to":"state_refunded", "via":"event_booked_refundAfter8Weeks_refunded"},' +
'		               {"from":"state_revolving", "to":"state_returned", "via":"event_revolving_return_returned"}],' +
'		"externalMachines":[{"id":"externalmachine_CurrentAccount", "label":"CurrentAccount", "url":"account.payment.CurrentAccount", "referenceType":"out"},' +
'		                    {"id":"externalmachine_BusinessCurrentAccount", "label":"BusinessCurrentAccount", "url":"account.payment.BusinessCurrentAccount", "referenceType":"out"},' +
'		                    {"id":"externalmachine_OverstapService", "label":"OverstapService", "url":"service.OverstapService", "referenceType":"out"},' +
'		                    {"id":"externalmachine_SepaDirectDebitWashAccount", "label":"SepaDirectDebitWashAccount", "url":"account.process.SepaDirectDebitWashAccount", "referenceType":"out"},' +
'		                    {"id":"externalmachine_Customer", "label":"Customer", "url":"customer.Customer", "referenceType":"out"},' +
'		                    {"id":"externalmachine_Mandate", "label":"Mandate", "url":"booking.sepa.dd.Mandate", "referenceType":"out"},' +
'		                    {"id":"externalmachine_RevolvingWashAccount", "label":"RevolvingWashAccount", "url":"account.process.RevolvingWashAccount", "referenceType":"out"}],' +
'		"transitionsToExternalMachines":[{"from":"event_initialized_revolve_revolving", "to":"externalmachine_RevolvingWashAccount", "toEvent":"event_withdraw"},' +
'		                                 {"from":"event_waitingForAdvice_return_returned", "to":"externalmachine_RevolvingWashAccount", "toEvent":"event_deposit"},' +
'		                                 {"from":"event_init_create_initialized", "to":"externalmachine_OverstapService"},' +
'		                                 {"from":"event_booked_reverse_reversed", "to":"externalmachine_BusinessCurrentAccount", "toEvent":"event_forcedWithdraw"},' +
'		                                 {"from":"event_waitingForAdvice_denied_returned", "to":"externalmachine_BusinessCurrentAccount", "toEvent":"event_forcedWithdraw"},' +
'		                                 {"from":"event_waitingForAdvice_forceBooking_booked", "to":"externalmachine_CurrentAccount", "toEvent":"event_forcedWithdraw"},' +
'		                                 {"from":"event_init_create_initialized", "to":"externalmachine_BusinessCurrentAccount"},' +
'		                                 {"from":"event_waitingForAdvice_denied_returned", "to":"externalmachine_RevolvingWashAccount", "toEvent":"event_deposit"},' +
'		                                 {"from":"event_revolving_return_returned", "to":"externalmachine_RevolvingWashAccount", "toEvent":"event_deposit"},' +
'		                                 {"from":"event_booked_refundAfter8Weeks_refunded", "to":"externalmachine_CurrentAccount", "toEvent":"event_forcedDeposit"},' +
'		                                 {"from":"event_waitingForAdvice_forcedReturn_returned", "to":"externalmachine_BusinessCurrentAccount", "toEvent":"event_forcedWithdraw"},' +
'		                                 {"from":"event_initialized_refuse_refused", "to":"externalmachine_BusinessCurrentAccount", "toEvent":"event_forcedWithdraw"},' +
'		                                 {"from":"event_initialized_revoke_revoked", "to":"externalmachine_BusinessCurrentAccount", "toEvent":"event_forcedWithdraw"},' +
'		                                 {"from":"event_initialized_cancel_canceled", "to":"externalmachine_BusinessCurrentAccount", "toEvent":"event_forcedWithdraw"},' +
'		                                 {"from":"event_waitingForAdvice_return_returned", "to":"externalmachine_BusinessCurrentAccount", "toEvent":"event_forcedWithdraw"},' +
'		                                 {"from":"event_initialized_reject_rejected", "to":"externalmachine_BusinessCurrentAccount", "toEvent":"event_forcedWithdraw"},' +
'		                                 {"from":"event_initialized_book_booked", "to":"externalmachine_Customer"},' +
'		                                 {"from":"event_booked_refundWithin8Weeks_refunded", "to":"externalmachine_BusinessCurrentAccount", "toEvent":"event_forcedWithdraw"},' +
'		                                 {"from":"event_revolving_bookAfterRevolve_booked", "to":"externalmachine_RevolvingWashAccount", "toEvent":"event_deposit"},' +
'		                                 {"from":"event_waitingForAdvice_forcedReturn_returned", "to":"externalmachine_RevolvingWashAccount", "toEvent":"event_deposit"},' +
'		                                 {"from":"event_initialized_needsAdvice_waitingForAdvice", "to":"externalmachine_SepaDirectDebitWashAccount", "toEvent":"event_deposit"},' +
'		                                 {"from":"event_revolving_return_returned", "to":"externalmachine_BusinessCurrentAccount", "toEvent":"event_forcedWithdraw"},' +
'		                                 {"from":"event_revolving_bookAfterRevolve_booked", "to":"externalmachine_CurrentAccount", "toEvent":"event_withdraw"},' +
'		                                 {"from":"event_initialized_reject_rejected", "to":"externalmachine_SepaDirectDebitWashAccount", "toEvent":"event_deposit"},' +
'		                                 {"from":"event_initialized_cancel_canceled", "to":"externalmachine_SepaDirectDebitWashAccount", "toEvent":"event_deposit"},' +
'		                                 {"from":"event_booked_refundWithin8Weeks_refunded", "to":"externalmachine_CurrentAccount", "toEvent":"event_forcedDeposit"},' +
'		                                 {"from":"event_init_create_initialized", "to":"externalmachine_CurrentAccount"},' +
'		                                 {"from":"event_initialized_book_booked", "to":"externalmachine_SepaDirectDebitWashAccount", "toEvent":"event_deposit"},' +
'		                                 {"from":"event_booked_reverse_reversed", "to":"externalmachine_CurrentAccount", "toEvent":"event_forcedDeposit"},' +
'		                                 {"from":"event_initialized_revoke_revoked", "to":"externalmachine_SepaDirectDebitWashAccount", "toEvent":"event_deposit"},' +
'		                                 {"from":"event_initialized_refuse_refused", "to":"externalmachine_SepaDirectDebitWashAccount", "toEvent":"event_deposit"},' +
'		                                 {"from":"event_initialized_needsAdvice_waitingForAdvice", "to":"externalmachine_Customer"},' +
'		                                 {"from":"event_initialized_revolve_revolving", "to":"externalmachine_SepaDirectDebitWashAccount", "toEvent":"event_deposit"},' +
'		                                 {"from":"event_booked_refundAfter8Weeks_refunded", "to":"externalmachine_BusinessCurrentAccount", "toEvent":"event_forcedWithdraw"},' +
'		                                 {"from":"event_initialized_revolve_revolving", "to":"externalmachine_CurrentAccount", "toEvent":"event_withdraw"},' +
'		                                 {"from":"event_initialized_needsAdvice_waitingForAdvice", "to":"externalmachine_RevolvingWashAccount", "toEvent":"event_withdraw"},' +
'		                                 {"from":"event_waitingForAdvice_forceBooking_booked", "to":"externalmachine_RevolvingWashAccount", "toEvent":"event_deposit"},' +
'		                                 {"from":"event_booked_refundAfter8Weeks_refunded", "to":"externalmachine_Mandate"},' +
'		                                 {"from":"event_initialized_needsAdvice_waitingForAdvice", "to":"externalmachine_CurrentAccount"}],' +
'		"transitionsFromExternalMachines":[]' +
'	},' +
'	{' +
'		"fqn":"booking.sepa.dd.DebitCreditorBooking", ' +
'		"name":"DebitCreditorBooking",' +
'		"documentation":"",' +
'		"modifier":"",' +
'		"inheritsFrom": {"name":"DebitBooking", "url":"booking.sepa.dd.DebitBooking"},' +
'		"extendedBy":[],' +
'		"fields":[{"name":"amount", "type":"Money"},' +
'		          {"name":"id", "type":"Integer"},' +
'		          {"name":"creditor", "type":"BusinessCurrentAccount"},' +
'		          {"name":"settlementDate", "type":"Date"}],' +
'		"events":[{' +
'		          	"id": "event_init_create_initialized",' +
'		          	"label": "create",' +
'		             "doc": "",' +
'		          	"config": [],' +
'		           	"params": [],' +
'		           	"preconditions": [],' +
'		           	"postconditions": [],' +
'		           	"sync": []' +
'		          	},' +
'		          {' +
'		          	"id": "event_initialized_book_booked",' +
'		          	"label": "book",' +
'		             "doc": "",' +
'		          	"config": [],' +
'		           	"params": [],' +
'		           	"preconditions": [],' +
'		           	"postconditions": [],' +
'		           	"sync": []' +
'		          	}],' +
'		"states":[{"id":"state_booked", "label":"", "final": true},' +
'		          {"id":"state_init", "label": "", "initial": true},' +
'		          {"id":"state_initialized", "label":"initialized"}],' +
'		"transitions":[{"from":"state_init", "to":"state_initialized", "via":"event_init_create_initialized"},' +
'		               {"from":"state_initialized", "to":"state_booked", "via":"event_initialized_book_booked"}],' +
'		"externalMachines":[{"id":"externalmachine_DirectDebit", "label":"DirectDebit", "url":"booking.sepa.dd.DirectDebit", "referenceType":"in"}],' +
'		"transitionsToExternalMachines":[],' +
'		"transitionsFromExternalMachines":[]' +
'	},' +
'	{' +
'		"fqn":"service.OverstapService", ' +
'		"name":"OverstapService",' +
'		"documentation":"",' +
'		"modifier":"external",' +
'		"inheritsFrom": {},' +
'		"extendedBy":[],' +
'		"fields":[],' +
'		"events":[],' +
'		"states":[],' +
'		"transitions":[],' +
'		"externalMachines":[{"id":"externalmachine_OnUsDebitBooking", "label":"OnUsDebitBooking", "url":"booking.sepa.dd.OnUsDebitBooking", "referenceType":"in"},' +
'		                    {"id":"externalmachine_NotOnUsDebitBooking", "label":"NotOnUsDebitBooking", "url":"booking.sepa.dd.NotOnUsDebitBooking", "referenceType":"in"}],' +
'		"transitionsToExternalMachines":[],' +
'		"transitionsFromExternalMachines":[]' +
'	},' +
'	{' +
'		"fqn":"account.process.WashAccount", ' +
'		"name":"WashAccount",' +
'		"documentation":"",' +
'		"modifier":"abstract",' +
'		"inheritsFrom": {"name":"Account", "url":"account.Account"},' +
'		"extendedBy":[{"name":"SepaDirectDebitWashAccount", "url":"account.process.SepaDirectDebitWashAccount"},' +
'		              {"name":"RevolvingWashAccount", "url":"account.process.RevolvingWashAccount"}],' +
'		"fields":[{"name":"balance", "type":"Time -> Money"},' +
'		          {"name":"accountNumber", "type":"IBAN"}],' +
'		"events":[],' +
'		"states":[],' +
'		"transitions":[],' +
'		"externalMachines":[],' +
'		"transitionsToExternalMachines":[],' +
'		"transitionsFromExternalMachines":[]' +
'	},' +
'	{' +
'		"fqn":"account.payment.limit.KwartaalLimiet", ' +
'		"name":"KwartaalLimiet",' +
'		"documentation":"",' +
'		"modifier":"",' +
'		"inheritsFrom": {"name":"Limit", "url":"account.payment.limit.Limit"},' +
'		"extendedBy":[],' +
'		"fields":[{"name":"accountNumber", "type":"Integer"},' +
'		          {"name":"limit", "type":"Integer"},' +
'		          {"name":"active", "type":"Boolean"}],' +
'		"events":[{' +
'		          	"id": "event_waitingForApproval_reject_rejected",' +
'		          	"label": "reject",' +
'		             "doc": "",' +
'		          	"config": [],' +
'		           	"params": [],' +
'		           	"preconditions": [],' +
'		           	"postconditions": [],' +
'		           	"sync": []' +
'		          	},' +
'		          {' +
'		          	"id": "event_active_close_closed",' +
'		          	"label": "close",' +
'		             "doc": "",' +
'		          	"config": [],' +
'		           	"params": [],' +
'		           	"preconditions": [],' +
'		           	"postconditions": [],' +
'		           	"sync": []' +
'		          	},' +
'		          {' +
'		          	"id": "event_init_create_waitingForApproval",' +
'		          	"label": "create",' +
'		             "doc": "",' +
'		          	"config": [{"name":"allowedLimitMin", "value":"500"},{"name":"allowedLimitMax", "value":"2000"}],' +
'		           	"params": [{"name":"initialLimit", "type":"Integer"},{"name":"initialInterestRate", "type":"Percentage"}],' +
'		           	"preconditions": [{"code":"initialLimit >= 500;"},{"code":"initialLimit <= 2000;"},{"code":"initialInterestRate > 0%;"}],' +
'		           	"postconditions": [{"code":"new this.limit(now) == initialLimit;"},{"code":"new this.interest(now) == initialInterestRate;"}],' +
'		           	"sync": []' +
'		          	},' +
'		          {' +
'		          	"id": "event_active_withdraw_active",' +
'		          	"label": "withdraw",' +
'		             "doc": "",' +
'		          	"config": [],' +
'		           	"params": [{"name":"balance", "type":"Timestamp -> Integer"},{"name":"amount", "type":"Integer"}],' +
'		           	"preconditions": [{"code":"isPositiveForADayWithinThreeMonths(balance);"},{"code":"balance(now) - amount + this.limit >= 0;"}],' +
'		           	"postconditions": [],' +
'		           	"sync": []' +
'		          	},' +
'		          {' +
'		          	"id": "event_waitingForApproval_approved_active",' +
'		          	"label": "approved",' +
'		             "doc": "",' +
'		          	"config": [],' +
'		           	"params": [],' +
'		           	"preconditions": [],' +
'		           	"postconditions": [{"code":"new this.active == true;"}],' +
'		           	"sync": []' +
'		          	}],' +
'		"states":[{"id":"state_closed", "label":"", "final": true},' +
'		          {"id":"state_waitingForApproval", "label":"waitingForApproval"},' +
'		          {"id":"state_rejected", "label":"", "final": true},' +
'		          {"id":"state_init", "label": "", "initial": true},' +
'		          {"id":"state_active", "label":"active"}],' +
'		"transitions":[{"from":"state_active", "to":"state_closed", "via":"event_active_close_closed"},' +
'		               {"from":"state_waitingForApproval", "to":"state_rejected", "via":"event_waitingForApproval_reject_rejected"},' +
'		               {"from":"state_active", "to":"state_active", "via":"event_active_withdraw_active"},' +
'		               {"from":"state_waitingForApproval", "to":"state_active", "via":"event_waitingForApproval_approved_active"},' +
'		               {"from":"state_init", "to":"state_waitingForApproval", "via":"event_init_create_waitingForApproval"}],' +
'		"externalMachines":[],' +
'		"transitionsToExternalMachines":[],' +
'		"transitionsFromExternalMachines":[]' +
'	},' +
'	{' +
'		"fqn":"account.payment.BusinessCurrentAccount", ' +
'		"name":"BusinessCurrentAccount",' +
'		"documentation":"",' +
'		"modifier":"",' +
'		"inheritsFrom": {"name":"CurrentAccount", "url":"account.payment.CurrentAccount"},' +
'		"extendedBy":[],' +
'		"fields":[{"name":"holds", "type":"Amount"},' +
'		          {"name":"balance", "type":"Time -> Money"},' +
'		          {"name":"currency", "type":"Currency"},' +
'		          {"name":"accountNumber", "type":"IBAN"},' +
'		          {"name":"creditInterestRate", "type":"Time -> Percentage"}],' +
'		"events":[{' +
'		          	"id": "event_opened_forcedWithdrawIgnoreDisposition_opened",' +
'		          	"label": "forcedWithdrawIgnoreDisposition",' +
'		             "doc": "",' +
'		          	"config": [],' +
'		           	"params": [{"name":"amount", "type":"Money"}],' +
'		           	"preconditions": [{"code":"amount > EUR 0.00;"}],' +
'		           	"postconditions": [{"code":"new this.balance == this.balance - amount;"}],' +
'		           	"sync": []' +
'		          	},' +
'		          {' +
'		          	"id": "event_denounced_indicateRegret_opened",' +
'		          	"label": "indicateRegret",' +
'		             "doc": "",' +
'		          	"config": [],' +
'		           	"params": [],' +
'		           	"preconditions": [],' +
'		           	"postconditions": [],' +
'		           	"sync": []' +
'		          	},' +
'		          {' +
'		          	"id": "event_init_openPaymentAccount_opened",' +
'		          	"label": "openPaymentAccount",' +
'		             "doc": "",' +
'		          	"config": [{"name":"allowedCreditFrequencies", "value":"Monthly"},{"name":"allowedCreditFrequencies", "value":"Quarterly"},{"name":"allowedCreditFrequencies", "value":"Yearly"},{"name":"allowedCreditFrequencies", "value":"{Monthly, Quarterly, Yearly}"}],' +
'		           	"params": [{"name":"accountNumber", "type":"String"},{"name":"creditInterestRate", "type":"Percentage"},{"name":"creditInterestCapitalisationFrequency", "type":"Frequency"}],' +
'		           	"preconditions": [{"code":"crebitInterestCapitalisationFrequency in {Monthly, Quarterly, Yearly};"}],' +
'		           	"postconditions": [{"code":"new this.balance == EUR 0.00;"},{"code":"new this.accountNumber == accountNumber;"},{"code":"new this.creditInterestRate(now) == creditInterestRate;"}],' +
'		           	"sync": []' +
'		          	},' +
'		          {' +
'		          	"id": "event_closed_archive_archived",' +
'		          	"label": "archive",' +
'		             "doc": "",' +
'		          	"config": [],' +
'		           	"params": [],' +
'		           	"preconditions": [{"code":"this.balance == 0;"}],' +
'		           	"postconditions": [],' +
'		           	"sync": []' +
'		          	},' +
'		          {' +
'		          	"id": "event_opened_updateHolds_opened",' +
'		          	"label": "updateHolds",' +
'		             "doc": "",' +
'		          	"config": [],' +
'		           	"params": [{"name":"amount", "type":"Money"}],' +
'		           	"preconditions": [],' +
'		           	"postconditions": [{"code":"new this.holds == this.holds + amount;"}],' +
'		           	"sync": []' +
'		          	},' +
'		          {' +
'		          	"id": "event_opened_withdraw_opened",' +
'		          	"label": "withdraw",' +
'		             "doc": "",' +
'		          	"config": [],' +
'		           	"params": [{"name":"amount", "type":"Money"}],' +
'		           	"preconditions": [{"code":"amount > EUR 0.00;"},{"code":"this.balance(now) - this.holds >= amount;"}],' +
'		           	"postconditions": [{"code":"new this.balance(now) == this.balance(now) - amount;"}],' +
'		           	"sync": []' +
'		          	},' +
'		          {' +
'		          	"id": "event_opened_deposit_opened",' +
'		          	"label": "deposit",' +
'		             "doc": "",' +
'		          	"config": [],' +
'		           	"params": [{"name":"amount", "type":"Money"}],' +
'		           	"preconditions": [{"code":"amount > EUR 0.00;"}],' +
'		           	"postconditions": [{"code":"new this.balance == this.balance + amount;"}],' +
'		           	"sync": []' +
'		          	},' +
'		          {' +
'		          	"id": "event_denounced_close_closed",' +
'		          	"label": "close",' +
'		             "doc": "",' +
'		          	"config": [],' +
'		           	"params": [],' +
'		           	"preconditions": [{"code":"this.balance == EUR 0.00;"}],' +
'		           	"postconditions": [],' +
'		           	"sync": []' +
'		          	},' +
'		          {' +
'		          	"id": "event_opened_denounce_denounced",' +
'		          	"label": "denounce",' +
'		             "doc": "",' +
'		          	"config": [],' +
'		           	"params": [],' +
'		           	"preconditions": [{"code":"this.balance >= EUR 0.00;"}],' +
'		           	"postconditions": [],' +
'		           	"sync": []' +
'		          	},' +
'		          {' +
'		          	"id": "event_denounced_forcedWithdrawIgnoreDisposition_denounced",' +
'		          	"label": "forcedWithdrawIgnoreDisposition",' +
'		             "doc": "",' +
'		          	"config": [],' +
'		           	"params": [{"name":"amount", "type":"Money"}],' +
'		           	"preconditions": [{"code":"amount > EUR 0.00;"}],' +
'		           	"postconditions": [{"code":"new this.balance == this.balance - amount;"}],' +
'		           	"sync": []' +
'		          	}],' +
'		"states":[{"id":"state_opened", "label":"opened"},' +
'		          {"id":"state_closed", "label":"closed"},' +
'		          {"id":"state_archived", "label":"", "final": true},' +
'		          {"id":"state_init", "label": "", "initial": true},' +
'		          {"id":"state_denounced", "label":"denounced"}],' +
'		"transitions":[{"from":"state_init", "to":"state_opened", "via":"event_init_openPaymentAccount_opened"},' +
'		               {"from":"state_denounced", "to":"state_opened", "via":"event_denounced_indicateRegret_opened"},' +
'		               {"from":"state_denounced", "to":"state_denounced", "via":"event_denounced_forcedWithdrawIgnoreDisposition_denounced"},' +
'		               {"from":"state_opened", "to":"state_denounced", "via":"event_opened_denounce_denounced"},' +
'		               {"from":"state_opened", "to":"state_opened", "via":"event_opened_forcedWithdrawIgnoreDisposition_opened"},' +
'		               {"from":"state_denounced", "to":"state_closed", "via":"event_denounced_close_closed"},' +
'		               {"from":"state_closed", "to":"state_archived", "via":"event_closed_archive_archived"},' +
'		               {"from":"state_opened", "to":"state_opened", "via":"event_opened_withdraw_opened"},' +
'		               {"from":"state_opened", "to":"state_opened", "via":"event_opened_updateHolds_opened"},' +
'		               {"from":"state_opened", "to":"state_opened", "via":"event_opened_deposit_opened"}],' +
'		"externalMachines":[{"id":"externalmachine_OnUsDebitBooking", "label":"OnUsDebitBooking", "url":"booking.sepa.dd.OnUsDebitBooking", "referenceType":"in"},' +
'		                    {"id":"externalmachine_NotFromUsDebitBooking", "label":"NotFromUsDebitBooking", "url":"booking.sepa.dd.NotFromUsDebitBooking", "referenceType":"in"},' +
'		                    {"id":"externalmachine_CreditBooking", "label":"CreditBooking", "url":"booking.sepa.dd.CreditBooking", "referenceType":"in"},' +
'		                    {"id":"externalmachine_NotOnUsDebitBooking", "label":"NotOnUsDebitBooking", "url":"booking.sepa.dd.NotOnUsDebitBooking", "referenceType":"in"}],' +
'		"transitionsToExternalMachines":[],' +
'		"transitionsFromExternalMachines":[{"fromMachine":"externalmachine_CreditBooking", "fromEvent":"event_initialized_book_successful", "to":"event_opened_deposit_opened"},' +
'		                                   {"fromMachine":"externalmachine_NotFromUsDebitBooking", "fromEvent":"event_initialized_book_booked", "to":"event_opened_forcedWithdrawIgnoreDisposition_opened"},' +
'		                                   {"fromMachine":"externalmachine_NotFromUsDebitBooking", "fromEvent":"event_initialized_book_booked", "to":"event_denounced_forcedWithdrawIgnoreDisposition_denounced"}]' +
'	},' +
'	{' +
'		"fqn":"account.Account", ' +
'		"name":"Account",' +
'		"documentation":"",' +
'		"modifier":"abstract",' +
'		"inheritsFrom": {},' +
'		"extendedBy":[{"name":"WashAccount", "url":"account.process.WashAccount"},' +
'		              {"name":"BankTreasury", "url":"account.system.BankTreasury"},' +
'		              {"name":"IngAccount", "url":"account.IngAccount"}],' +
'		"fields":[],' +
'		"events":[],' +
'		"states":[],' +
'		"transitions":[],' +
'		"externalMachines":[],' +
'		"transitionsToExternalMachines":[],' +
'		"transitionsFromExternalMachines":[]' +
'	},' +
'	{' +
'		"fqn":"account.payment.block.DepositBlock", ' +
'		"name":"DepositBlock",' +
'		"documentation":"",' +
'		"modifier":"",' +
'		"inheritsFrom": {"name":"Block", "url":"account.payment.block.Block"},' +
'		"extendedBy":[],' +
'		"fields":[{"name":"accountId", "type":"Integer"}],' +
'		"events":[{' +
'		          	"id": "event_init_create_notBlocked",' +
'		          	"label": "create",' +
'		             "doc": "",' +
'		          	"config": [],' +
'		           	"params": [],' +
'		           	"preconditions": [],' +
'		           	"postconditions": [],' +
'		           	"sync": []' +
'		          	},' +
'		          {' +
'		          	"id": "event_notBlocked_deposit_notBlocked",' +
'		          	"label": "deposit",' +
'		             "doc": "",' +
'		          	"config": [],' +
'		           	"params": [],' +
'		           	"preconditions": [],' +
'		           	"postconditions": [],' +
'		           	"sync": []' +
'		          	},' +
'		          {' +
'		          	"id": "event_notBlocked_block_blocked",' +
'		          	"label": "block",' +
'		             "doc": "",' +
'		          	"config": [],' +
'		           	"params": [],' +
'		           	"preconditions": [],' +
'		           	"postconditions": [],' +
'		           	"sync": []' +
'		          	},' +
'		          {' +
'		          	"id": "event_blocked_unblock_notBlocked",' +
'		          	"label": "unblock",' +
'		             "doc": "",' +
'		          	"config": [],' +
'		           	"params": [],' +
'		           	"preconditions": [],' +
'		           	"postconditions": [],' +
'		           	"sync": []' +
'		          	}],' +
'		"states":[{"id":"state_blocked", "label":"blocked"},' +
'		          {"id":"state_init", "label": "", "initial": true},' +
'		          {"id":"state_notBlocked", "label":"notBlocked"}],' +
'		"transitions":[{"from":"state_notBlocked", "to":"state_blocked", "via":"event_notBlocked_block_blocked"},' +
'		               {"from":"state_notBlocked", "to":"state_notBlocked", "via":"event_notBlocked_deposit_notBlocked"},' +
'		               {"from":"state_init", "to":"state_notBlocked", "via":"event_init_create_notBlocked"},' +
'		               {"from":"state_blocked", "to":"state_notBlocked", "via":"event_blocked_unblock_notBlocked"}],' +
'		"externalMachines":[],' +
'		"transitionsToExternalMachines":[],' +
'		"transitionsFromExternalMachines":[]' +
'	},' +
'	{' +
'		"fqn":"booking.sepa.ct.SepaRegion", ' +
'		"name":"SepaRegion",' +
'		"documentation":"",' +
'		"modifier":"",' +
'		"inheritsFrom": {},' +
'		"extendedBy":[],' +
'		"fields":[{"name":"countryCodes", "type":"set[String]"}],' +
'		"events":[{' +
'		          	"id": "event_init_init_opened",' +
'		          	"label": "init",' +
'		             "doc": "",' +
'		          	"config": [],' +
'		           	"params": [],' +
'		           	"preconditions": [],' +
'		           	"postconditions": [{"code":"new this.countryCodes == countryCodes;"}],' +
'		           	"sync": []' +
'		          	},' +
'		          {' +
'		          	"id": "event_opened_inRegion_opened",' +
'		          	"label": "inRegion",' +
'		             "doc": "",' +
'		          	"config": [],' +
'		           	"params": [{"name":"account", "type":"IBAN"}],' +
'		           	"preconditions": [{"code":"account.countryCode in countryCodes;"}],' +
'		           	"postconditions": [],' +
'		           	"sync": []' +
'		          	}],' +
'		"states":[{"id":"state_opened", "label":"opened"},' +
'		          {"id":"state_init", "label": "", "initial": true}],' +
'		"transitions":[{"from":"state_init", "to":"state_opened", "via":"event_init_init_opened"},' +
'		               {"from":"state_opened", "to":"state_opened", "via":"event_opened_inRegion_opened"}],' +
'		"externalMachines":[{"id":"externalmachine_CreditTransfer", "label":"CreditTransfer", "url":"booking.sepa.ct.CreditTransfer", "referenceType":"in"}],' +
'		"transitionsToExternalMachines":[],' +
'		"transitionsFromExternalMachines":[{"fromMachine":"externalmachine_CreditTransfer", "fromEvent":"event_init_create_validated", "to":"event_opened_inRegion_opened"}]' +
'	},' +
'	{' +
'		"fqn":"booking.sepa.dd.NotOnUsDebitBooking", ' +
'		"name":"NotOnUsDebitBooking",' +
'		"documentation":"This booking object holds the (Direct) Debit bookings that are not debitted from an ING account (in other words, they are debitted from an account from another bank).",' +
'		"modifier":"",' +
'		"inheritsFrom": {"name":"DebitBooking", "url":"booking.sepa.dd.DebitBooking"},' +
'		"extendedBy":[],' +
'		"fields":[{"name":"amount", "type":"Money"},' +
'		          {"name":"id", "type":"Integer"},' +
'		          {"name":"creditor", "type":"BusinessCurrentAccount"},' +
'		          {"name":"debtor", "type":"IBAN"},' +
'		          {"name":"settlementDate", "type":"Date"}],' +
'		"events":[{' +
'		          	"id": "event_initialized_book_booked",' +
'		          	"label": "book",' +
'		             "doc": "Book the NotOnUsDebitBooking using the following scheme:\\n\\t\\n\\t\\t\\t| Creditor Account | SEPA DD WASH | ISA BT | Debtor Account\\n\\t--------|------------------|--------------|--------|---------------\\n\\tdebet\\t|\\t\\t\\t\\t   | \\t\\t\\t  | X      | \\n\\tcredit\\t|                  | X            |        |",' +
'		          	"config": [],' +
'		           	"params": [],' +
'		           	"preconditions": [{"code":"this.settlementDate <= now;"}],' +
'		           	"postconditions": [],' +
'		           	"sync": [{"code":"SepaDirectDebitWashAccount.deposit(this.amount);"},{"code":"BankTreasury.withdraw(this.amount);"}]' +
'		          	},' +
'		          {' +
'		          	"id": "event_init_create_initialized",' +
'		          	"label": "create",' +
'		             "doc": "Initialize a NotOnUsBooking.",' +
'		          	"config": [],' +
'		           	"params": [{"name":"id", "type":"Integer"},{"name":"creditor", "type":"IBAN"},{"name":"debtor", "type":"IBAN"},{"name":"amount", "type":"Money"},{"name":"settlementDate", "type":"Date"}],' +
'		           	"preconditions": [{"code":"amount > EUR 0.00;"},{"code":"settlementDate >= now;"},{"doc":"Sepa DD bookings can only be created by business customers", "code":"initialized BusinessCurrentAccount[creditor]"},{"doc":"The debtor account can not be an ING account OR the \'Overstap Service\' is currently active for this dector account", "code":"(not initialized CurrentAccount[debtor]) || (initialized OverstapService[debtor])"}],' +
'		           	"postconditions": [{"code":"new this.id == id;"},{"code":"new this.creditor == BusinessCurrentAccount[creditor];"},{"code":"new this.debtor == debtor;"},{"code":"new this.amount == amount;"},{"code":"new this.settlementDate == settlementDate;"}],' +
'		           	"sync": []' +
'		          	}],' +
'		"states":[{"id":"state_booked", "label":"", "final": true},' +
'		          {"id":"state_init", "label": "", "initial": true},' +
'		          {"id":"state_initialized", "label":"initialized"}],' +
'		"transitions":[{"from":"state_init", "to":"state_initialized", "via":"event_init_create_initialized"},' +
'		               {"from":"state_initialized", "to":"state_booked", "via":"event_initialized_book_booked"}],' +
'		"externalMachines":[{"id":"externalmachine_CurrentAccount", "label":"CurrentAccount", "url":"account.payment.CurrentAccount", "referenceType":"out"},' +
'		                    {"id":"externalmachine_BusinessCurrentAccount", "label":"BusinessCurrentAccount", "url":"account.payment.BusinessCurrentAccount", "referenceType":"out"},' +
'		                    {"id":"externalmachine_OverstapService", "label":"OverstapService", "url":"service.OverstapService", "referenceType":"out"},' +
'		                    {"id":"externalmachine_SepaDirectDebitWashAccount", "label":"SepaDirectDebitWashAccount", "url":"account.process.SepaDirectDebitWashAccount", "referenceType":"out"},' +
'		                    {"id":"externalmachine_BankTreasury", "label":"BankTreasury", "url":"account.system.BankTreasury", "referenceType":"out"}],' +
'		"transitionsToExternalMachines":[{"from":"event_initialized_book_booked", "to":"externalmachine_BankTreasury", "toEvent":"event_withdraw"},' +
'		                                 {"from":"event_init_create_initialized", "to":"externalmachine_OverstapService"},' +
'		                                 {"from":"event_init_create_initialized", "to":"externalmachine_BusinessCurrentAccount"},' +
'		                                 {"from":"event_init_create_initialized", "to":"externalmachine_CurrentAccount"},' +
'		                                 {"from":"event_initialized_book_booked", "to":"externalmachine_SepaDirectDebitWashAccount", "toEvent":"event_deposit"}],' +
'		"transitionsFromExternalMachines":[]' +
'	},' +
'	{' +
'		"fqn":"account.payment.block.DirectDebitBlock", ' +
'		"name":"DirectDebitBlock",' +
'		"documentation":"",' +
'		"modifier":"",' +
'		"inheritsFrom": {"name":"WithdrawBlock", "url":"account.payment.block.WithdrawBlock"},' +
'		"extendedBy":[],' +
'		"fields":[{"name":"accountId", "type":"Integer"}],' +
'		"events":[{' +
'		          	"id": "event_init_create_notBlocked",' +
'		          	"label": "create",' +
'		             "doc": "",' +
'		          	"config": [],' +
'		           	"params": [],' +
'		           	"preconditions": [],' +
'		           	"postconditions": [],' +
'		           	"sync": []' +
'		          	},' +
'		          {' +
'		          	"id": "event_blocked_unblock_notBlocked",' +
'		          	"label": "unblock",' +
'		             "doc": "",' +
'		          	"config": [],' +
'		           	"params": [],' +
'		           	"preconditions": [],' +
'		           	"postconditions": [],' +
'		           	"sync": []' +
'		          	},' +
'		          {' +
'		          	"id": "event_notBlocked_block_blocked",' +
'		          	"label": "block",' +
'		             "doc": "",' +
'		          	"config": [],' +
'		           	"params": [],' +
'		           	"preconditions": [],' +
'		           	"postconditions": [],' +
'		           	"sync": []' +
'		          	},' +
'		          {' +
'		          	"id": "event_notBlocked_withdraw_notBlocked",' +
'		          	"label": "withdraw",' +
'		             "doc": "",' +
'		          	"config": [],' +
'		           	"params": [],' +
'		           	"preconditions": [],' +
'		           	"postconditions": [],' +
'		           	"sync": []' +
'		          	}],' +
'		"states":[{"id":"state_blocked", "label":"blocked"},' +
'		          {"id":"state_init", "label": "", "initial": true},' +
'		          {"id":"state_notBlocked", "label":"notBlocked"}],' +
'		"transitions":[{"from":"state_notBlocked", "to":"state_blocked", "via":"event_notBlocked_block_blocked"},' +
'		               {"from":"state_notBlocked", "to":"state_notBlocked", "via":"event_notBlocked_withdraw_notBlocked"},' +
'		               {"from":"state_init", "to":"state_notBlocked", "via":"event_init_create_notBlocked"},' +
'		               {"from":"state_blocked", "to":"state_notBlocked", "via":"event_blocked_unblock_notBlocked"}],' +
'		"externalMachines":[],' +
'		"transitionsToExternalMachines":[],' +
'		"transitionsFromExternalMachines":[]' +
'	},' +
'	{' +
'		"fqn":"booking.sepa.ct.CreditTransfer", ' +
'		"name":"CreditTransfer",' +
'		"documentation":"",' +
'		"modifier":"",' +
'		"inheritsFrom": {},' +
'		"extendedBy":[],' +
'		"fields":[{"name":"executionDate", "type":"Date"},' +
'		          {"name":"ordering", "type":"IBAN"},' +
'		          {"name":"receiveDate", "type":"Date"},' +
'		          {"name":"beneficiary", "type":"IBAN"},' +
'		          {"name":"amount", "type":"Money"}],' +
'		"events":[{' +
'		          	"id": "event_init_create_validated",' +
'		          	"label": "create",' +
'		             "doc": "",' +
'		          	"config": [],' +
'		           	"params": [{"name":"ordering", "type":"IBAN"},{"name":"beneficiary", "type":"IBAN"},{"name":"executionDate", "type":"Date"},{"name":"receiveDate", "type":"Date"},{"name":"amount", "type":"Money"}],' +
'		           	"preconditions": [{"doc":"SEPA CT only accepts EUR payments", "code":"amount.currency == EUR"},{"code":"amount > EUR 0.00;"},{"doc":"The executionDate must be within 5 days of the received date", "code":"executionDate >= receiveDate && executionDate - receiveDate <= 5 Day"},{"doc":"The received date can not be in the past", "code":"receiveDate >= now"}],' +
'		           	"postconditions": [{"code":"new this.ordering == ordering;"},{"code":"new this.beneficiary == beneficiary;"},{"code":"new this.executionDate == executionDate;"},{"code":"new this.receiveDate == receiveDate;"},{"code":"new this.amount == amount;"},{"code":"new this.currency == currency;"}],' +
'		           	"sync": [{"code":"SepaRegion.inRegion(ordering);"},{"code":"SepaRegion.inRegion(beneficiary);"}]' +
'		          	}],' +
'		"states":[{"id":"state_validated", "label":"validated"},' +
'		          {"id":"state_init", "label": "", "initial": true}],' +
'		"transitions":[{"from":"state_init", "to":"state_validated", "via":"event_init_create_validated"}],' +
'		"externalMachines":[{"id":"externalmachine_SepaRegion", "label":"SepaRegion", "url":"booking.sepa.ct.SepaRegion", "referenceType":"out"}],' +
'		"transitionsToExternalMachines":[{"from":"event_init_create_validated", "to":"externalmachine_SepaRegion", "toEvent":"event_inRegion"}],' +
'		"transitionsFromExternalMachines":[]' +
'	},' +
'	{' +
'		"fqn":"customer.Customer", ' +
'		"name":"Customer",' +
'		"documentation":"",' +
'		"modifier":"external",' +
'		"inheritsFrom": {},' +
'		"extendedBy":[],' +
'		"fields":[],' +
'		"events":[],' +
'		"states":[],' +
'		"transitions":[],' +
'		"externalMachines":[{"id":"externalmachine_OnUsDebitBooking", "label":"OnUsDebitBooking", "url":"booking.sepa.dd.OnUsDebitBooking", "referenceType":"in"}],' +
'		"transitionsToExternalMachines":[],' +
'		"transitionsFromExternalMachines":[]' +
'	},' +
'	{' +
'		"fqn":"account.IngAccount", ' +
'		"name":"IngAccount",' +
'		"documentation":"",' +
'		"modifier":"",' +
'		"inheritsFrom": {"name":"Account", "url":"account.Account"},' +
'		"extendedBy":[{"name":"CurrentAccount", "url":"account.payment.CurrentAccount"}],' +
'		"fields":[{"name":"balance", "type":"Time -> Money"},' +
'		          {"name":"currency", "type":"Currency"},' +
'		          {"name":"accountNumber", "type":"IBAN"}],' +
'		"events":[{' +
'		          	"id": "event_closed_archive_archived",' +
'		          	"label": "archive",' +
'		             "doc": "",' +
'		          	"config": [],' +
'		           	"params": [],' +
'		           	"preconditions": [{"code":"this.balance == 0;"}],' +
'		           	"postconditions": [],' +
'		           	"sync": []' +
'		          	}],' +
'		"states":[{"id":"state_opened", "label":"opened"},' +
'		          {"id":"state_closed", "label":"closed"},' +
'		          {"id":"state_archived", "label":"", "final": true},' +
'		          {"id":"state_init", "label": "", "initial": true}],' +
'		"transitions":[{"from":"state_closed", "to":"state_archived", "via":"event_closed_archive_archived"}],' +
'		"externalMachines":[],' +
'		"transitionsToExternalMachines":[],' +
'		"transitionsFromExternalMachines":[]' +
'	},' +
'	{' +
'		"fqn":"account.process.SepaDirectDebitWashAccount", ' +
'		"name":"SepaDirectDebitWashAccount",' +
'		"documentation":"",' +
'		"modifier":"",' +
'		"inheritsFrom": {"name":"WashAccount", "url":"account.process.WashAccount"},' +
'		"extendedBy":[],' +
'		"fields":[{"name":"balance", "type":"Time -> Money"},' +
'		          {"name":"accountNumber", "type":"IBAN"}],' +
'		"events":[{' +
'		          	"id": "event_init_openWashAccount_opened",' +
'		          	"label": "openWashAccount",' +
'		             "doc": "",' +
'		          	"config": [{"name":"accountNumber", "value":"NL34INGB0000001"},{"name":"currency", "value":"EUR"}],' +
'		           	"params": [{"name":"initialAmount", "type":"Money"}],' +
'		           	"preconditions": [],' +
'		           	"postconditions": [{"code":"new this.balance == initialAmount;"},{"code":"new this.NL34INGB0000001 == NL34INGB0000001;"},{"code":"new this.EUR == EUR;"}],' +
'		           	"sync": []' +
'		          	},' +
'		          {' +
'		          	"id": "event_opened_deposit_opened",' +
'		          	"label": "deposit",' +
'		             "doc": "",' +
'		          	"config": [],' +
'		           	"params": [{"name":"amount", "type":"Money"}],' +
'		           	"preconditions": [{"code":"amount >= EUR 0.00;"}],' +
'		           	"postconditions": [{"code":"new this.balance == this.balance + amount;"}],' +
'		           	"sync": []' +
'		          	},' +
'		          {' +
'		          	"id": "event_opened_withdraw_opened",' +
'		          	"label": "withdraw",' +
'		             "doc": "",' +
'		          	"config": [],' +
'		           	"params": [{"name":"amount", "type":"Money"}],' +
'		           	"preconditions": [{"code":"amount >= EUR 0.00;"}],' +
'		           	"postconditions": [{"code":"new this.balance == this.balance - amount;"}],' +
'		           	"sync": []' +
'		          	}],' +
'		"states":[{"id":"state_opened", "label":"opened"},' +
'		          {"id":"state_init", "label": "", "initial": true}],' +
'		"transitions":[{"from":"state_init", "to":"state_opened", "via":"event_init_openWashAccount_opened"},' +
'		               {"from":"state_opened", "to":"state_opened", "via":"event_opened_withdraw_opened"},' +
'		               {"from":"state_opened", "to":"state_opened", "via":"event_opened_deposit_opened"}],' +
'		"externalMachines":[{"id":"externalmachine_OnUsDebitBooking", "label":"OnUsDebitBooking", "url":"booking.sepa.dd.OnUsDebitBooking", "referenceType":"in"},' +
'		                    {"id":"externalmachine_CreditBooking", "label":"CreditBooking", "url":"booking.sepa.dd.CreditBooking", "referenceType":"in"},' +
'		                    {"id":"externalmachine_NotOnUsDebitBooking", "label":"NotOnUsDebitBooking", "url":"booking.sepa.dd.NotOnUsDebitBooking", "referenceType":"in"}],' +
'		"transitionsToExternalMachines":[],' +
'		"transitionsFromExternalMachines":[{"fromMachine":"externalmachine_OnUsDebitBooking", "fromEvent":"event_initialized_revoke_revoked", "to":"event_opened_deposit_opened"},' +
'		                                   {"fromMachine":"externalmachine_OnUsDebitBooking", "fromEvent":"event_initialized_needsAdvice_waitingForAdvice", "to":"event_opened_deposit_opened"},' +
'		                                   {"fromMachine":"externalmachine_OnUsDebitBooking", "fromEvent":"event_initialized_reject_rejected", "to":"event_opened_deposit_opened"},' +
'		                                   {"fromMachine":"externalmachine_OnUsDebitBooking", "fromEvent":"event_initialized_cancel_canceled", "to":"event_opened_deposit_opened"},' +
'		                                   {"fromMachine":"externalmachine_OnUsDebitBooking", "fromEvent":"event_initialized_revolve_revolving", "to":"event_opened_deposit_opened"},' +
'		                                   {"fromMachine":"externalmachine_NotOnUsDebitBooking", "fromEvent":"event_initialized_book_booked", "to":"event_opened_deposit_opened"},' +
'		                                   {"fromMachine":"externalmachine_OnUsDebitBooking", "fromEvent":"event_initialized_refuse_refused", "to":"event_opened_deposit_opened"},' +
'		                                   {"fromMachine":"externalmachine_OnUsDebitBooking", "fromEvent":"event_initialized_book_booked", "to":"event_opened_deposit_opened"}]' +
'	},' +
'	{' +
'		"fqn":"account.payment.limit.NoLimit", ' +
'		"name":"NoLimit",' +
'		"documentation":"",' +
'		"modifier":"",' +
'		"inheritsFrom": {"name":"Limit", "url":"account.payment.limit.Limit"},' +
'		"extendedBy":[],' +
'		"fields":[{"name":"accountNumber", "type":"Integer"},' +
'		          {"name":"limit", "type":"Integer"},' +
'		          {"name":"active", "type":"Boolean"}],' +
'		"events":[{' +
'		          	"id": "event_active_close_closed",' +
'		          	"label": "close",' +
'		             "doc": "",' +
'		          	"config": [],' +
'		           	"params": [],' +
'		           	"preconditions": [],' +
'		           	"postconditions": [],' +
'		           	"sync": []' +
'		          	},' +
'		          {' +
'		          	"id": "event_active_withdraw_active",' +
'		          	"label": "withdraw",' +
'		             "doc": "",' +
'		          	"config": [],' +
'		           	"params": [{"name":"balance", "type":"Timestamp -> Integer"},{"name":"amount", "type":"Integer"}],' +
'		           	"preconditions": [{"code":"isPositiveForADayWithinThreeMonths(balance);"},{"code":"balance(now) - amount + this.limit >= 0;"}],' +
'		           	"postconditions": [],' +
'		           	"sync": []' +
'		          	},' +
'		          {' +
'		          	"id": "event_init_createNoLimit_active",' +
'		          	"label": "createNoLimit",' +
'		             "doc": "",' +
'		          	"config": [],' +
'		           	"params": [],' +
'		           	"preconditions": [],' +
'		           	"postconditions": [{"code":"new this.limit == 0;"},{"code":"new this.active == true;"}],' +
'		           	"sync": []' +
'		          	}],' +
'		"states":[{"id":"state_closed", "label":"", "final": true},' +
'		          {"id":"state_init", "label": "", "initial": true},' +
'		          {"id":"state_active", "label":"active"}],' +
'		"transitions":[{"from":"state_active", "to":"state_closed", "via":"event_active_close_closed"},' +
'		               {"from":"state_init", "to":"state_active", "via":"event_init_createNoLimit_active"},' +
'		               {"from":"state_active", "to":"state_active", "via":"event_active_withdraw_active"}],' +
'		"externalMachines":[],' +
'		"transitionsToExternalMachines":[],' +
'		"transitionsFromExternalMachines":[]' +
'	},' +
'	{' +
'		"fqn":"agreement.Agreement", ' +
'		"name":"Agreement",' +
'		"documentation":"",' +
'		"modifier":"external",' +
'		"inheritsFrom": {},' +
'		"extendedBy":[],' +
'		"fields":[],' +
'		"events":[],' +
'		"states":[],' +
'		"transitions":[],' +
'		"externalMachines":[{"id":"externalmachine_DirectDebit", "label":"DirectDebit", "url":"booking.sepa.dd.DirectDebit", "referenceType":"in"}],' +
'		"transitionsToExternalMachines":[],' +
'		"transitionsFromExternalMachines":[]' +
'	},' +
'	{' +
'		"fqn":"account.payment.limit.Limit", ' +
'		"name":"Limit",' +
'		"documentation":"",' +
'		"modifier":"abstract",' +
'		"inheritsFrom": {},' +
'		"extendedBy":[{"name":"KwartaalLimiet", "url":"account.payment.limit.KwartaalLimiet"},' +
'		              {"name":"NoLimit", "url":"account.payment.limit.NoLimit"}],' +
'		"fields":[{"name":"accountNumber", "type":"Integer"},' +
'		          {"name":"limit", "type":"Integer"},' +
'		          {"name":"active", "type":"Boolean"}],' +
'		"events":[],' +
'		"states":[],' +
'		"transitions":[],' +
'		"externalMachines":[],' +
'		"transitionsToExternalMachines":[],' +
'		"transitionsFromExternalMachines":[]' +
'	},' +
'	{' +
'		"fqn":"booking.sepa.dd.Mandate", ' +
'		"name":"Mandate",' +
'		"documentation":"",' +
'		"modifier":"external",' +
'		"inheritsFrom": {},' +
'		"extendedBy":[],' +
'		"fields":[],' +
'		"events":[],' +
'		"states":[],' +
'		"transitions":[],' +
'		"externalMachines":[{"id":"externalmachine_OnUsDebitBooking", "label":"OnUsDebitBooking", "url":"booking.sepa.dd.OnUsDebitBooking", "referenceType":"in"}],' +
'		"transitionsToExternalMachines":[],' +
'		"transitionsFromExternalMachines":[]' +
'	},' +
'	{' +
'		"fqn":"booking.sepa.dd.NotFromUsDebitBooking", ' +
'		"name":"NotFromUsDebitBooking",' +
'		"documentation":"A Not From Us Debit Booking occurs when a NotOnUsDebitBooking is revoked (for whatever reason) by the Debtor Bank.",' +
'		"modifier":"",' +
'		"inheritsFrom": {"name":"DebitBooking", "url":"booking.sepa.dd.DebitBooking"},' +
'		"extendedBy":[],' +
'		"fields":[{"name":"amount", "type":"Money"},' +
'		          {"name":"id", "type":"Integer"},' +
'		          {"name":"reason", "type":"Integer"},' +
'		          {"name":"creditor", "type":"BusinessCurrentAccount"},' +
'		          {"name":"debtor", "type":"IBAN"},' +
'		          {"name":"settlementDate", "type":"Date"}],' +
'		"events":[{' +
'		          	"id": "event_init_create_initialized",' +
'		          	"label": "create",' +
'		             "doc": "Initialize a NotFromUsDebitBooking. This booking gets created when an R-message is received from another bank",' +
'		          	"config": [],' +
'		           	"params": [{"name":"creditor", "type":"IBAN"},{"name":"debitor", "type":"IBAN"},{"name":"amount", "type":"Money"},{"name":"reason", "type":"Integer"}],' +
'		           	"preconditions": [{"code":"initialized BusinessCurrentAccount[creditor];"},{"code":"amount > EUR 0.00;"}],' +
'		           	"postconditions": [{"code":"new this.settlementDate == now;"},{"code":"new this.creditor == creditor;"},{"code":"new this.debitor == debtor;"},{"code":"new this.reason == reason;"}],' +
'		           	"sync": []' +
'		          	},' +
'		          {' +
'		          	"id": "event_initialized_book_booked",' +
'		          	"label": "book",' +
'		             "doc": "Book with the following scheme:\\n\\t\\n\\t      | Creditor Account | SEPA DD WASH | ISA BT | Debtor Account \\n\\t------|------------------|--------------|--------|----------------\\n\\tdebet | X (forced)       |              |        |                \\n\\tcredit|                  |              | X      |",' +
'		          	"config": [],' +
'		           	"params": [],' +
'		           	"preconditions": [],' +
'		           	"postconditions": [],' +
'		           	"sync": [{"code":"BusinessCurrentAccount[this.creditor].forcedWithdrawIgnoreDisposition(this.amount);"},{"code":"BankTreasury.deposit(this.amount);"}]' +
'		          	}],' +
'		"states":[{"id":"state_booked", "label":"", "final": true},' +
'		          {"id":"state_init", "label": "", "initial": true},' +
'		          {"id":"state_initialized", "label":"initialized"}],' +
'		"transitions":[{"from":"state_init", "to":"state_initialized", "via":"event_init_create_initialized"},' +
'		               {"from":"state_initialized", "to":"state_booked", "via":"event_initialized_book_booked"}],' +
'		"externalMachines":[{"id":"externalmachine_BusinessCurrentAccount", "label":"BusinessCurrentAccount", "url":"account.payment.BusinessCurrentAccount", "referenceType":"out"},' +
'		                    {"id":"externalmachine_BankTreasury", "label":"BankTreasury", "url":"account.system.BankTreasury", "referenceType":"out"}],' +
'		"transitionsToExternalMachines":[{"from":"event_initialized_book_booked", "to":"externalmachine_BankTreasury", "toEvent":"event_deposit"},' +
'		                                 {"from":"event_init_create_initialized", "to":"externalmachine_BusinessCurrentAccount"},' +
'		                                 {"from":"event_initialized_book_booked", "to":"externalmachine_BusinessCurrentAccount", "toEvent":"event_forcedWithdrawIgnoreDisposition"}],' +
'		"transitionsFromExternalMachines":[]' +
'	},' +
'	{' +
'		"fqn":"account.payment.block.SpecificDirectDebitBlock", ' +
'		"name":"SpecificDirectDebitBlock",' +
'		"documentation":"",' +
'		"modifier":"",' +
'		"inheritsFrom": {},' +
'		"extendedBy":[],' +
'		"fields":[{"name":"blockedAccounts", "type":"set[String]"},' +
'		          {"name":"accountId", "type":"String"}],' +
'		"events":[{' +
'		          	"id": "event_receiving_withdraw_receiving",' +
'		          	"label": "withdraw",' +
'		             "doc": "",' +
'		          	"config": [],' +
'		           	"params": [{"name":"toAccount", "type":"String"}],' +
'		           	"preconditions": [{"code":"not toAccount in this.blockedAccounts;"}],' +
'		           	"postconditions": [],' +
'		           	"sync": []' +
'		          	},' +
'		          {' +
'		          	"id": "event_init_create_receiving",' +
'		          	"label": "create",' +
'		             "doc": "",' +
'		          	"config": [],' +
'		           	"params": [],' +
'		           	"preconditions": [],' +
'		           	"postconditions": [],' +
'		           	"sync": []' +
'		          	},' +
'		          {' +
'		          	"id": "event_receiving_removeBlockedAccount_receiving",' +
'		          	"label": "removeBlockedAccount",' +
'		             "doc": "",' +
'		          	"config": [],' +
'		           	"params": [],' +
'		           	"preconditions": [],' +
'		           	"postconditions": [{"code":"not account in new this.blockedAccounts;"}],' +
'		           	"sync": []' +
'		          	},' +
'		          {' +
'		          	"id": "event_receiving_addBlockedAccount_receiving",' +
'		          	"label": "addBlockedAccount",' +
'		             "doc": "",' +
'		          	"config": [],' +
'		           	"params": [{"name":"account", "type":"String"}],' +
'		           	"preconditions": [],' +
'		           	"postconditions": [{"code":"account in new this.blockedAccounts;"}],' +
'		           	"sync": []' +
'		          	}],' +
'		"states":[{"id":"state_receiving", "label":"receiving"},' +
'		          {"id":"state_init", "label": "", "initial": true}],' +
'		"transitions":[{"from":"state_receiving", "to":"state_receiving", "via":"event_receiving_removeBlockedAccount_receiving"},' +
'		               {"from":"state_init", "to":"state_receiving", "via":"event_init_create_receiving"},' +
'		               {"from":"state_receiving", "to":"state_receiving", "via":"event_receiving_addBlockedAccount_receiving"},' +
'		               {"from":"state_receiving", "to":"state_receiving", "via":"event_receiving_withdraw_receiving"}],' +
'		"externalMachines":[],' +
'		"transitionsToExternalMachines":[],' +
'		"transitionsFromExternalMachines":[]' +
'	},' +
'	{' +
'		"fqn":"account.payment.block.WithdrawBlock", ' +
'		"name":"WithdrawBlock",' +
'		"documentation":"",' +
'		"modifier":"",' +
'		"inheritsFrom": {"name":"Block", "url":"account.payment.block.Block"},' +
'		"extendedBy":[{"name":"DirectDebitBlock", "url":"account.payment.block.DirectDebitBlock"}],' +
'		"fields":[{"name":"accountId", "type":"Integer"}],' +
'		"events":[{' +
'		          	"id": "event_init_create_notBlocked",' +
'		          	"label": "create",' +
'		             "doc": "",' +
'		          	"config": [],' +
'		           	"params": [],' +
'		           	"preconditions": [],' +
'		           	"postconditions": [],' +
'		           	"sync": []' +
'		          	},' +
'		          {' +
'		          	"id": "event_blocked_unblock_notBlocked",' +
'		          	"label": "unblock",' +
'		             "doc": "",' +
'		          	"config": [],' +
'		           	"params": [],' +
'		           	"preconditions": [],' +
'		           	"postconditions": [],' +
'		           	"sync": []' +
'		          	},' +
'		          {' +
'		          	"id": "event_notBlocked_block_blocked",' +
'		          	"label": "block",' +
'		             "doc": "",' +
'		          	"config": [],' +
'		           	"params": [],' +
'		           	"preconditions": [],' +
'		           	"postconditions": [],' +
'		           	"sync": []' +
'		          	},' +
'		          {' +
'		          	"id": "event_notBlocked_withdraw_notBlocked",' +
'		          	"label": "withdraw",' +
'		             "doc": "",' +
'		          	"config": [],' +
'		           	"params": [],' +
'		           	"preconditions": [],' +
'		           	"postconditions": [],' +
'		           	"sync": []' +
'		          	}],' +
'		"states":[{"id":"state_blocked", "label":"blocked"},' +
'		          {"id":"state_init", "label": "", "initial": true},' +
'		          {"id":"state_notBlocked", "label":"notBlocked"}],' +
'		"transitions":[{"from":"state_notBlocked", "to":"state_blocked", "via":"event_notBlocked_block_blocked"},' +
'		               {"from":"state_notBlocked", "to":"state_notBlocked", "via":"event_notBlocked_withdraw_notBlocked"},' +
'		               {"from":"state_init", "to":"state_notBlocked", "via":"event_init_create_notBlocked"},' +
'		               {"from":"state_blocked", "to":"state_notBlocked", "via":"event_blocked_unblock_notBlocked"}],' +
'		"externalMachines":[],' +
'		"transitionsToExternalMachines":[],' +
'		"transitionsFromExternalMachines":[]' +
'	},' +
'	{' +
'		"fqn":"account.payment.CurrentAccount", ' +
'		"name":"CurrentAccount",' +
'		"documentation":"",' +
'		"modifier":"",' +
'		"inheritsFrom": {"name":"IngAccount", "url":"account.IngAccount"},' +
'		"extendedBy":[{"name":"BusinessCurrentAccount", "url":"account.payment.BusinessCurrentAccount"}],' +
'		"fields":[{"name":"holds", "type":"Amount"},' +
'		          {"name":"balance", "type":"Time -> Money"},' +
'		          {"name":"currency", "type":"Currency"},' +
'		          {"name":"accountNumber", "type":"IBAN"},' +
'		          {"name":"creditInterestRate", "type":"Time -> Percentage"}],' +
'		"events":[{' +
'		          	"id": "event_opened_forcedWithdrawIgnoreDisposition_opened",' +
'		          	"label": "forcedWithdrawIgnoreDisposition",' +
'		             "doc": "",' +
'		          	"config": [],' +
'		           	"params": [{"name":"amount", "type":"Money"}],' +
'		           	"preconditions": [{"code":"amount > EUR 0.00;"}],' +
'		           	"postconditions": [{"code":"new this.balance == this.balance - amount;"}],' +
'		           	"sync": []' +
'		          	},' +
'		          {' +
'		          	"id": "event_denounced_indicateRegret_opened",' +
'		          	"label": "indicateRegret",' +
'		             "doc": "",' +
'		          	"config": [],' +
'		           	"params": [],' +
'		           	"preconditions": [],' +
'		           	"postconditions": [],' +
'		           	"sync": []' +
'		          	},' +
'		          {' +
'		          	"id": "event_init_openPaymentAccount_opened",' +
'		          	"label": "openPaymentAccount",' +
'		             "doc": "",' +
'		          	"config": [{"name":"allowedCreditFrequencies", "value":"Monthly"},{"name":"allowedCreditFrequencies", "value":"Quarterly"},{"name":"allowedCreditFrequencies", "value":"Yearly"},{"name":"allowedCreditFrequencies", "value":"{Monthly, Quarterly, Yearly}"}],' +
'		           	"params": [{"name":"accountNumber", "type":"String"},{"name":"creditInterestRate", "type":"Percentage"},{"name":"creditInterestCapitalisationFrequency", "type":"Frequency"}],' +
'		           	"preconditions": [{"code":"crebitInterestCapitalisationFrequency in {Monthly, Quarterly, Yearly};"}],' +
'		           	"postconditions": [{"code":"new this.balance == EUR 0.00;"},{"code":"new this.accountNumber == accountNumber;"},{"code":"new this.creditInterestRate(now) == creditInterestRate;"}],' +
'		           	"sync": []' +
'		          	},' +
'		          {' +
'		          	"id": "event_closed_archive_archived",' +
'		          	"label": "archive",' +
'		             "doc": "",' +
'		          	"config": [],' +
'		           	"params": [],' +
'		           	"preconditions": [{"code":"this.balance == 0;"}],' +
'		           	"postconditions": [],' +
'		           	"sync": []' +
'		          	},' +
'		          {' +
'		          	"id": "event_opened_updateHolds_opened",' +
'		          	"label": "updateHolds",' +
'		             "doc": "",' +
'		          	"config": [],' +
'		           	"params": [{"name":"amount", "type":"Money"}],' +
'		           	"preconditions": [],' +
'		           	"postconditions": [{"code":"new this.holds == this.holds + amount;"}],' +
'		           	"sync": []' +
'		          	},' +
'		          {' +
'		          	"id": "event_opened_withdraw_opened",' +
'		          	"label": "withdraw",' +
'		             "doc": "",' +
'		          	"config": [],' +
'		           	"params": [{"name":"amount", "type":"Money"}],' +
'		           	"preconditions": [{"code":"amount > EUR 0.00;"},{"code":"this.balance(now) - this.holds >= amount;"}],' +
'		           	"postconditions": [{"code":"new this.balance(now) == this.balance(now) - amount;"}],' +
'		           	"sync": []' +
'		          	},' +
'		          {' +
'		          	"id": "event_opened_deposit_opened",' +
'		          	"label": "deposit",' +
'		             "doc": "",' +
'		          	"config": [],' +
'		           	"params": [{"name":"amount", "type":"Money"}],' +
'		           	"preconditions": [{"code":"amount > EUR 0.00;"}],' +
'		           	"postconditions": [{"code":"new this.balance == this.balance + amount;"}],' +
'		           	"sync": []' +
'		          	},' +
'		          {' +
'		          	"id": "event_denounced_close_closed",' +
'		          	"label": "close",' +
'		             "doc": "",' +
'		          	"config": [],' +
'		           	"params": [],' +
'		           	"preconditions": [{"code":"this.balance == EUR 0.00;"}],' +
'		           	"postconditions": [],' +
'		           	"sync": []' +
'		          	},' +
'		          {' +
'		          	"id": "event_opened_denounce_denounced",' +
'		          	"label": "denounce",' +
'		             "doc": "",' +
'		          	"config": [],' +
'		           	"params": [],' +
'		           	"preconditions": [{"code":"this.balance >= EUR 0.00;"}],' +
'		           	"postconditions": [],' +
'		           	"sync": []' +
'		          	},' +
'		          {' +
'		          	"id": "event_denounced_forcedWithdrawIgnoreDisposition_denounced",' +
'		          	"label": "forcedWithdrawIgnoreDisposition",' +
'		             "doc": "",' +
'		          	"config": [],' +
'		           	"params": [{"name":"amount", "type":"Money"}],' +
'		           	"preconditions": [{"code":"amount > EUR 0.00;"}],' +
'		           	"postconditions": [{"code":"new this.balance == this.balance - amount;"}],' +
'		           	"sync": []' +
'		          	}],' +
'		"states":[{"id":"state_opened", "label":"opened"},' +
'		          {"id":"state_closed", "label":"closed"},' +
'		          {"id":"state_archived", "label":"", "final": true},' +
'		          {"id":"state_init", "label": "", "initial": true},' +
'		          {"id":"state_denounced", "label":"denounced"}],' +
'		"transitions":[{"from":"state_init", "to":"state_opened", "via":"event_init_openPaymentAccount_opened"},' +
'		               {"from":"state_denounced", "to":"state_opened", "via":"event_denounced_indicateRegret_opened"},' +
'		               {"from":"state_denounced", "to":"state_denounced", "via":"event_denounced_forcedWithdrawIgnoreDisposition_denounced"},' +
'		               {"from":"state_opened", "to":"state_denounced", "via":"event_opened_denounce_denounced"},' +
'		               {"from":"state_opened", "to":"state_opened", "via":"event_opened_forcedWithdrawIgnoreDisposition_opened"},' +
'		               {"from":"state_denounced", "to":"state_closed", "via":"event_denounced_close_closed"},' +
'		               {"from":"state_closed", "to":"state_archived", "via":"event_closed_archive_archived"},' +
'		               {"from":"state_opened", "to":"state_opened", "via":"event_opened_withdraw_opened"},' +
'		               {"from":"state_opened", "to":"state_opened", "via":"event_opened_updateHolds_opened"},' +
'		               {"from":"state_opened", "to":"state_opened", "via":"event_opened_deposit_opened"}],' +
'		"externalMachines":[{"id":"externalmachine_OnUsDebitBooking", "label":"OnUsDebitBooking", "url":"booking.sepa.dd.OnUsDebitBooking", "referenceType":"in"},' +
'		                    {"id":"externalmachine_NotOnUsDebitBooking", "label":"NotOnUsDebitBooking", "url":"booking.sepa.dd.NotOnUsDebitBooking", "referenceType":"in"}],' +
'		"transitionsToExternalMachines":[],' +
'		"transitionsFromExternalMachines":[{"fromMachine":"externalmachine_OnUsDebitBooking", "fromEvent":"event_initialized_revolve_revolving", "to":"event_opened_withdraw_opened"},' +
'		                                   {"fromMachine":"externalmachine_OnUsDebitBooking", "fromEvent":"event_revolving_bookAfterRevolve_booked", "to":"event_opened_withdraw_opened"}]' +
'	},' +
'	{' +
'		"fqn":"account.payment.block.Block", ' +
'		"name":"Block",' +
'		"documentation":"",' +
'		"modifier":"abstract",' +
'		"inheritsFrom": {},' +
'		"extendedBy":[{"name":"DepositBlock", "url":"account.payment.block.DepositBlock"},' +
'		              {"name":"WithdrawBlock", "url":"account.payment.block.WithdrawBlock"}],' +
'		"fields":[{"name":"accountId", "type":"Integer"}],' +
'		"events":[{' +
'		          	"id": "event_init_create_notBlocked",' +
'		          	"label": "create",' +
'		             "doc": "",' +
'		          	"config": [],' +
'		           	"params": [],' +
'		           	"preconditions": [],' +
'		           	"postconditions": [],' +
'		           	"sync": []' +
'		          	},' +
'		          {' +
'		          	"id": "event_notBlocked_block_blocked",' +
'		          	"label": "block",' +
'		             "doc": "",' +
'		          	"config": [],' +
'		           	"params": [],' +
'		           	"preconditions": [],' +
'		           	"postconditions": [],' +
'		           	"sync": []' +
'		          	},' +
'		          {' +
'		          	"id": "event_blocked_unblock_notBlocked",' +
'		          	"label": "unblock",' +
'		             "doc": "",' +
'		          	"config": [],' +
'		           	"params": [],' +
'		           	"preconditions": [],' +
'		           	"postconditions": [],' +
'		           	"sync": []' +
'		          	}],' +
'		"states":[{"id":"state_blocked", "label":"blocked"},' +
'		          {"id":"state_init", "label": "", "initial": true},' +
'		          {"id":"state_notBlocked", "label":"notBlocked"}],' +
'		"transitions":[{"from":"state_notBlocked", "to":"state_blocked", "via":"event_notBlocked_block_blocked"},' +
'		               {"from":"state_init", "to":"state_notBlocked", "via":"event_init_create_notBlocked"},' +
'		               {"from":"state_blocked", "to":"state_notBlocked", "via":"event_blocked_unblock_notBlocked"}],' +
'		"externalMachines":[],' +
'		"transitionsToExternalMachines":[],' +
'		"transitionsFromExternalMachines":[]' +
'	},' +
'	{' +
'		"fqn":"booking.sepa.dd.DirectDebit", ' +
'		"name":"DirectDebit",' +
'		"documentation":"A Sepa DirectDebit is a type of payment with which business customers can debit multiple customers at once.\\n\\tThese customers can be both ING as non-ING customers. The business customer must be a customer of the ING and must have a business account.\\n\\tThe DirectDebit can be seen as a \'container\' for the underlying booking objects",' +
'		"modifier":"",' +
'		"inheritsFrom": {},' +
'		"extendedBy":[],' +
'		"fields":[{"name":"totalAmount", "type":"Money"},' +
'		          {"name":"creditBooking", "type":"CreditBooking"},' +
'		          {"name":"settlementDate", "type":"Date"},' +
'		          {"name":"debitBookings", "type":"set[DebitBooking]"},' +
'		          {"name":"creditor", "type":"IBAN"},' +
'		          {"name":"creationDate", "type":"Date"},' +
'		          {"name":"id", "type":"Integer"}],' +
'		"events":[{' +
'		          	"id": "event_initialized_revoke_revoked",' +
'		          	"label": "revoke",' +
'		             "doc": "",' +
'		          	"config": [],' +
'		           	"params": [],' +
'		           	"preconditions": [],' +
'		           	"postconditions": [],' +
'		           	"sync": []' +
'		          	},' +
'		          {' +
'		          	"id": "event_initialized_addCreditBooking_initialized",' +
'		          	"label": "addCreditBooking",' +
'		             "doc": "A Direct Debit has one credit booking. The linked credit booking must be compatible with the Direct Debit.",' +
'		          	"config": [],' +
'		           	"params": [{"name":"bookingId", "type":"Integer"}],' +
'		           	"preconditions": [{"code":"this.creditBooking == -1;"},{"code":"initialized CreditBooking[bookingId];"},{"code":"CreditBooking[bookingId].creditor == this.creditor;"},{"code":"CreditBooking[bookingId].settlementDate == this.settlementDate;"},{"code":"CreditBooking[bookingId].globalCredit == this.totalAmount;"}],' +
'		           	"postconditions": [{"code":"new this.creditBooking == bookingId;"}],' +
'		           	"sync": []' +
'		          	},' +
'		          {' +
'		          	"id": "event_initialized_addDebitBooking_initialized",' +
'		          	"label": "addDebitBooking",' +
'		             "doc": "A Direct Debit can have multiple debit bookings.",' +
'		          	"config": [],' +
'		           	"params": [{"name":"bookingId", "type":"Integer"},{"name":"debtor", "type":"IBAN"}],' +
'		           	"preconditions": [{"code":"not bookingId in this.debitBookings;"},{"code":"initialized DebitBooking[bookingId];"},{"code":"DebitBooking[bookingId].debtor == debtor;"},{"code":"DebitBooking[bookingId].creditor == this.creditor;"},{"code":"DebitBooking[bookingId].settlementDate == this.settlementDate;"},{"doc":"The accumalated amount of all the debit bookings and the to be added debit booking should not exceed the total amount of the Direct Debit", "code":"sum({DebitBooking[db].amount | db <- this.debitBookings}) + DebitBooking[bookingId].amount <= this.totalAmount"}],' +
'		           	"postconditions": [{"code":"bookingId in new this.debitBookings;"}],' +
'		           	"sync": []' +
'		          	},' +
'		          {' +
'		          	"id": "event_inClearance_execute_inExecution",' +
'		          	"label": "execute",' +
'		             "doc": "",' +
'		          	"config": [],' +
'		           	"params": [],' +
'		           	"preconditions": [{"code":"target2DaysBefore(2 Day, this.settlementDate);"}],' +
'		           	"postconditions": [],' +
'		           	"sync": []' +
'		          	},' +
'		          {' +
'		          	"id": "event_initialized_clear_inClearance",' +
'		          	"label": "clear",' +
'		             "doc": "",' +
'		          	"config": [],' +
'		           	"params": [],' +
'		           	"preconditions": [{"code":"this.totalAmount == CreditBooking[this.creditBooking].globalCredit;"},{"doc":"The sum of all debit bookings should be equal to the total amount of the direct debit", "code":"this.totalAmount == sum({DebitBookint[db].amount | db <- this.debitBookings})"},{"doc":"All bookings (credit and debit) must be in initialized state", "code":"CreditBooking[this.creditBooking] instate initialized"},{"code":"allTrue({DebitBooking[db] instate initialized | db <- this.debitBookings});"}],' +
'		           	"postconditions": [],' +
'		           	"sync": []' +
'		          	},' +
'		          {' +
'		          	"id": "event_inClearance_cancel_inClearance",' +
'		          	"label": "cancel",' +
'		             "doc": "A Debit Booking can be cancelled after the Debit Booking is cleared. In this case a new counter booking is instantiated \\n\\tto debit the creditor for the cancelled amount. The original Credit Booking is not altered",' +
'		          	"config": [],' +
'		           	"params": [{"name":"bookingToCancel", "type":"IBAN"},{"name":"bookingToBalance", "type":"IBAN"}],' +
'		           	"preconditions": [{"code":"bookingToCancel in this.debitBookings;"},{"code":"bookingToCancel instate initialized;"},{"doc":"To balance this cancellation a new booking on the creditor is created", "code":"DebitCreditorBooking[bookingToBalance].creditor == this.creditor"},{"code":"DebitCreditorBooking[bookingToBalance].amount == DebitBooking[this.bookingToCancel].amount;"},{"code":"DebitCreditorBooking[bookingToBalance].settlementDate == this.settlementDate;"},{"code":"not bookingToBalance in this.debitBookings;"},{"code":"bookingToBalance instate initialized;"}],' +
'		           	"postconditions": [{"code":"not bookingToCancel in this.debitBookings;"},{"code":"bookingToBalance in this.debitBookings;"}],' +
'		           	"sync": [{"code":"DebitBooking[bookingToCancel].cancel();"}]' +
'		          	},' +
'		          {' +
'		          	"id": "event_init_submit_initialized",' +
'		          	"label": "submit",' +
'		             "doc": "Submit the direct debit",' +
'		          	"config": [],' +
'		           	"params": [{"name":"id", "type":"Integer"},{"name":"creditor", "type":"IBAN"},{"name":"globalCredit", "type":"Money"},{"name":"settlementDate", "type":"Date"}],' +
'		           	"preconditions": [{"code":"initialized Agreement[creditor];"},{"code":"globalCredit > EUR 0.00;"}],' +
'		           	"postconditions": [{"code":"new this.id == id;"},{"code":"new this.creationDate == now;"},{"code":"new this.totalAmount == globalCredit;"},{"code":"new this.settlementDate == nextT2Day(settlementDate);"},{"code":"new this.creditBooking == -1;"},{"code":"new this.debitBookings == {};"}],' +
'		           	"sync": [{"code":"Agreement[creditor].canSubmitSdd(globalCredit);"}]' +
'		          	},' +
'		          {' +
'		          	"id": "event_inExecution_finalizeBookings_irrevocable",' +
'		          	"label": "finalizeBookings",' +
'		             "doc": "",' +
'		          	"config": [],' +
'		           	"params": [],' +
'		           	"preconditions": [{"code":"finalized CreditBooking[this.creditBooking];"},{"code":"allTrue({finalized DebitBooking[db] | db <- this.debitBookings});"}],' +
'		           	"postconditions": [],' +
'		           	"sync": []' +
'		          	}],' +
'		"states":[{"id":"state_irrevocable", "label":"", "final": true},' +
'		          {"id":"state_init", "label": "", "initial": true},' +
'		          {"id":"state_revoked", "label":"", "final": true},' +
'		          {"id":"state_inExecution", "label":"inExecution"},' +
'		          {"id":"state_inClearance", "label":"inClearance"},' +
'		          {"id":"state_initialized", "label":"initialized"}],' +
'		"transitions":[{"from":"state_initialized", "to":"state_initialized", "via":"event_initialized_addCreditBooking_initialized"},' +
'		               {"from":"state_initialized", "to":"state_initialized", "via":"event_initialized_addDebitBooking_initialized"},' +
'		               {"from":"state_inExecution", "to":"state_irrevocable", "via":"event_inExecution_finalizeBookings_irrevocable"},' +
'		               {"from":"state_initialized", "to":"state_inClearance", "via":"event_initialized_clear_inClearance"},' +
'		               {"from":"state_initialized", "to":"state_revoked", "via":"event_initialized_revoke_revoked"},' +
'		               {"from":"state_inClearance", "to":"state_inClearance", "via":"event_inClearance_cancel_inClearance"},' +
'		               {"from":"state_init", "to":"state_initialized", "via":"event_init_submit_initialized"},' +
'		               {"from":"state_inClearance", "to":"state_inExecution", "via":"event_inClearance_execute_inExecution"}],' +
'		"externalMachines":[{"id":"externalmachine_Agreement", "label":"Agreement", "url":"agreement.Agreement", "referenceType":"out"},' +
'		                    {"id":"externalmachine_DebitBooking", "label":"DebitBooking", "url":"booking.sepa.dd.DebitBooking", "referenceType":"out"},' +
'		                    {"id":"externalmachine_DebitCreditorBooking", "label":"DebitCreditorBooking", "url":"booking.sepa.dd.DebitCreditorBooking", "referenceType":"out"},' +
'		                    {"id":"externalmachine_DebitBookint", "label":"DebitBookint", "url":"?", "referenceType":"out"},' +
'		                    {"id":"externalmachine_CreditBooking", "label":"CreditBooking", "url":"booking.sepa.dd.CreditBooking", "referenceType":"out"}],' +
'		"transitionsToExternalMachines":[{"from":"event_initialized_addDebitBooking_initialized", "to":"externalmachine_DebitBooking"},' +
'		                                 {"from":"event_init_submit_initialized", "to":"externalmachine_Agreement", "toEvent":"event_canSubmitSdd"},' +
'		                                 {"from":"event_inClearance_cancel_inClearance", "to":"externalmachine_DebitBooking", "toEvent":"event_cancel"},' +
'		                                 {"from":"event_inExecution_finalizeBookings_irrevocable", "to":"externalmachine_DebitBooking"},' +
'		                                 {"from":"event_initialized_clear_inClearance", "to":"externalmachine_CreditBooking"},' +
'		                                 {"from":"event_inClearance_cancel_inClearance", "to":"externalmachine_DebitCreditorBooking"},' +
'		                                 {"from":"event_initialized_addCreditBooking_initialized", "to":"externalmachine_CreditBooking"},' +
'		                                 {"from":"event_inExecution_finalizeBookings_irrevocable", "to":"externalmachine_CreditBooking"},' +
'		                                 {"from":"event_initialized_clear_inClearance", "to":"externalmachine_DebitBooking"},' +
'		                                 {"from":"event_initialized_clear_inClearance", "to":"externalmachine_DebitBookint"}],' +
'		"transitionsFromExternalMachines":[]' +
'	},' +
'	{' +
'		"fqn":"booking.sepa.dd.CreditBooking", ' +
'		"name":"CreditBooking",' +
'		"documentation":"",' +
'		"modifier":"",' +
'		"inheritsFrom": {},' +
'		"extendedBy":[],' +
'		"fields":[{"name":"globalCredit", "type":"Money"},' +
'		          {"name":"id", "type":"Integer"},' +
'		          {"name":"settlementDate", "type":"Date"},' +
'		          {"name":"creditor", "type":"IBAN"},' +
'		          {"name":"failureReason", "type":"Integer"}],' +
'		"events":[{' +
'		          	"id": "event_initialized_fail_failed",' +
'		          	"label": "fail",' +
'		             "doc": "",' +
'		          	"config": [],' +
'		           	"params": [{"name":"failureReason", "type":"Integer"}],' +
'		           	"preconditions": [{"doc":"Check if the failure reason is one of the accepted reasons", "code":"knownFailureReason(failureReason)"}],' +
'		           	"postconditions": [{"code":"new this.failureReason == this.failureReason;"}],' +
'		           	"sync": []' +
'		          	},' +
'		          {' +
'		          	"id": "event_initialized_book_successful",' +
'		          	"label": "book",' +
'		             "doc": "* this is a test\\n\\t* this is another test",' +
'		          	"config": [],' +
'		           	"params": [],' +
'		           	"preconditions": [],' +
'		           	"postconditions": [],' +
'		           	"sync": [{"code":"BusinessCurrentAccount[this.creditor].deposit(this.globalCredit);"},{"code":"SepaDirectDebitWashAccount.withdrawFromWash(this.globalCredit);"}]' +
'		          	},' +
'		          {' +
'		          	"id": "event_init_create_initialized",' +
'		          	"label": "create",' +
'		             "doc": "",' +
'		          	"config": [],' +
'		           	"params": [{"name":"id", "type":"Integer"},{"name":"creditor", "type":"IBAN"},{"name":"globalCredit", "type":"Money"},{"name":"settlementDate", "type":"Date"}],' +
'		           	"preconditions": [{"code":"globalCredit > EUR 0.00;"},{"code":"initialized BusinessCurrentAccount[creditor];"}],' +
'		           	"postconditions": [{"code":"new this.id == id;"},{"code":"new this.creditor == creditor;"},{"code":"new this.globalCredit == globalCredit;"},{"code":"new this.settlementDate == nextTarget2Day(settlementDate);"}],' +
'		           	"sync": []' +
'		          	}],' +
'		"states":[{"id":"state_init", "label": "", "initial": true},' +
'		          {"id":"state_successful", "label":"", "final": true},' +
'		          {"id":"state_failed", "label":"", "final": true},' +
'		          {"id":"state_initialized", "label":"initialized"}],' +
'		"transitions":[{"from":"state_initialized", "to":"state_successful", "via":"event_initialized_book_successful"},' +
'		               {"from":"state_initialized", "to":"state_failed", "via":"event_initialized_fail_failed"},' +
'		               {"from":"state_init", "to":"state_initialized", "via":"event_init_create_initialized"}],' +
'		"externalMachines":[{"id":"externalmachine_DirectDebit", "label":"DirectDebit", "url":"booking.sepa.dd.DirectDebit", "referenceType":"in"},' +
'		                    {"id":"externalmachine_BusinessCurrentAccount", "label":"BusinessCurrentAccount", "url":"account.payment.BusinessCurrentAccount", "referenceType":"out"},' +
'		                    {"id":"externalmachine_SepaDirectDebitWashAccount", "label":"SepaDirectDebitWashAccount", "url":"account.process.SepaDirectDebitWashAccount", "referenceType":"out"}],' +
'		"transitionsToExternalMachines":[{"from":"event_initialized_book_successful", "to":"externalmachine_BusinessCurrentAccount", "toEvent":"event_deposit"},' +
'		                                 {"from":"event_init_create_initialized", "to":"externalmachine_BusinessCurrentAccount"},' +
'		                                 {"from":"event_initialized_book_successful", "to":"externalmachine_SepaDirectDebitWashAccount", "toEvent":"event_withdrawFromWash"}],' +
'		"transitionsFromExternalMachines":[]' +
'	},' +
'	{' +
'		"fqn":"account.system.BankTreasury", ' +
'		"name":"BankTreasury",' +
'		"documentation":"",' +
'		"modifier":"",' +
'		"inheritsFrom": {"name":"Account", "url":"account.Account"},' +
'		"extendedBy":[],' +
'		"fields":[],' +
'		"events":[{' +
'		          	"id": "event_init_initialize_opened",' +
'		          	"label": "initialize",' +
'		             "doc": "",' +
'		          	"config": [],' +
'		           	"params": [],' +
'		           	"preconditions": [],' +
'		           	"postconditions": [],' +
'		           	"sync": []' +
'		          	},' +
'		          {' +
'		          	"id": "event_opened_withdraw_opened",' +
'		          	"label": "withdraw",' +
'		             "doc": "",' +
'		          	"config": [],' +
'		           	"params": [{"name":"amount", "type":"Money"}],' +
'		           	"preconditions": [],' +
'		           	"postconditions": [],' +
'		           	"sync": []' +
'		          	},' +
'		          {' +
'		          	"id": "event_opened_deposit_opened",' +
'		          	"label": "deposit",' +
'		             "doc": "",' +
'		          	"config": [],' +
'		           	"params": [{"name":"amount", "type":"Money"}],' +
'		           	"preconditions": [],' +
'		           	"postconditions": [],' +
'		           	"sync": []' +
'		          	}],' +
'		"states":[{"id":"state_opened", "label":"opened"},' +
'		          {"id":"state_init", "label": "", "initial": true}],' +
'		"transitions":[{"from":"state_init", "to":"state_opened", "via":"event_init_initialize_opened"},' +
'		               {"from":"state_opened", "to":"state_opened", "via":"event_opened_withdraw_opened"},' +
'		               {"from":"state_opened", "to":"state_opened", "via":"event_opened_deposit_opened"}],' +
'		"externalMachines":[{"id":"externalmachine_NotFromUsDebitBooking", "label":"NotFromUsDebitBooking", "url":"booking.sepa.dd.NotFromUsDebitBooking", "referenceType":"in"},' +
'		                    {"id":"externalmachine_NotOnUsDebitBooking", "label":"NotOnUsDebitBooking", "url":"booking.sepa.dd.NotOnUsDebitBooking", "referenceType":"in"}],' +
'		"transitionsToExternalMachines":[],' +
'		"transitionsFromExternalMachines":[{"fromMachine":"externalmachine_NotFromUsDebitBooking", "fromEvent":"event_initialized_book_booked", "to":"event_opened_deposit_opened"},' +
'		                                   {"fromMachine":"externalmachine_NotOnUsDebitBooking", "fromEvent":"event_initialized_book_booked", "to":"event_opened_withdraw_opened"}]' +
'	},' +
'	{' +
'		"fqn":"account.process.RevolvingWashAccount", ' +
'		"name":"RevolvingWashAccount",' +
'		"documentation":"",' +
'		"modifier":"",' +
'		"inheritsFrom": {"name":"WashAccount", "url":"account.process.WashAccount"},' +
'		"extendedBy":[],' +
'		"fields":[{"name":"balance", "type":"Time -> Money"},' +
'		          {"name":"accountNumber", "type":"IBAN"}],' +
'		"events":[{' +
'		          	"id": "event_init_openWashAccount_opened",' +
'		          	"label": "openWashAccount",' +
'		             "doc": "",' +
'		          	"config": [{"name":"accountNumber", "value":"NL34INGB0000001"},{"name":"currency", "value":"EUR"}],' +
'		           	"params": [{"name":"initialAmount", "type":"Money"}],' +
'		           	"preconditions": [],' +
'		           	"postconditions": [{"code":"new this.balance == initialAmount;"},{"code":"new this.NL34INGB0000001 == NL34INGB0000001;"},{"code":"new this.EUR == EUR;"}],' +
'		           	"sync": []' +
'		          	},' +
'		          {' +
'		          	"id": "event_opened_deposit_opened",' +
'		          	"label": "deposit",' +
'		             "doc": "",' +
'		          	"config": [],' +
'		           	"params": [{"name":"amount", "type":"Money"}],' +
'		           	"preconditions": [{"code":"amount >= EUR 0.00;"}],' +
'		           	"postconditions": [{"code":"new this.balance == this.balance + amount;"}],' +
'		           	"sync": []' +
'		          	},' +
'		          {' +
'		          	"id": "event_opened_withdraw_opened",' +
'		          	"label": "withdraw",' +
'		             "doc": "",' +
'		          	"config": [],' +
'		           	"params": [{"name":"amount", "type":"Money"}],' +
'		           	"preconditions": [{"code":"amount >= EUR 0.00;"}],' +
'		           	"postconditions": [{"code":"new this.balance == this.balance - amount;"}],' +
'		           	"sync": []' +
'		          	}],' +
'		"states":[{"id":"state_opened", "label":"opened"},' +
'		          {"id":"state_init", "label": "", "initial": true}],' +
'		"transitions":[{"from":"state_init", "to":"state_opened", "via":"event_init_openWashAccount_opened"},' +
'		               {"from":"state_opened", "to":"state_opened", "via":"event_opened_withdraw_opened"},' +
'		               {"from":"state_opened", "to":"state_opened", "via":"event_opened_deposit_opened"}],' +
'		"externalMachines":[{"id":"externalmachine_OnUsDebitBooking", "label":"OnUsDebitBooking", "url":"booking.sepa.dd.OnUsDebitBooking", "referenceType":"in"}],' +
'		"transitionsToExternalMachines":[],' +
'		"transitionsFromExternalMachines":[{"fromMachine":"externalmachine_OnUsDebitBooking", "fromEvent":"event_revolving_return_returned", "to":"event_opened_deposit_opened"},' +
'		                                   {"fromMachine":"externalmachine_OnUsDebitBooking", "fromEvent":"event_waitingForAdvice_denied_returned", "to":"event_opened_deposit_opened"},' +
'		                                   {"fromMachine":"externalmachine_OnUsDebitBooking", "fromEvent":"event_waitingForAdvice_forceBooking_booked", "to":"event_opened_deposit_opened"},' +
'		                                   {"fromMachine":"externalmachine_OnUsDebitBooking", "fromEvent":"event_initialized_needsAdvice_waitingForAdvice", "to":"event_opened_withdraw_opened"},' +
'		                                   {"fromMachine":"externalmachine_OnUsDebitBooking", "fromEvent":"event_waitingForAdvice_forcedReturn_returned", "to":"event_opened_deposit_opened"},' +
'		                                   {"fromMachine":"externalmachine_OnUsDebitBooking", "fromEvent":"event_waitingForAdvice_return_returned", "to":"event_opened_deposit_opened"},' +
'		                                   {"fromMachine":"externalmachine_OnUsDebitBooking", "fromEvent":"event_initialized_revolve_revolving", "to":"event_opened_withdraw_opened"},' +
'		                                   {"fromMachine":"externalmachine_OnUsDebitBooking", "fromEvent":"event_revolving_bookAfterRevolve_booked", "to":"event_opened_deposit_opened"}]' +
'	},' +
'	{' +
'		"fqn":"booking.sepa.dd.DebitBooking", ' +
'		"name":"DebitBooking",' +
'		"documentation":"",' +
'		"modifier":"abstract",' +
'		"inheritsFrom": {},' +
'		"extendedBy":[{"name":"OnUsDebitBooking", "url":"booking.sepa.dd.OnUsDebitBooking"},' +
'		              {"name":"NotFromUsDebitBooking", "url":"booking.sepa.dd.NotFromUsDebitBooking"},' +
'		              {"name":"DebitCreditorBooking", "url":"booking.sepa.dd.DebitCreditorBooking"},' +
'		              {"name":"NotOnUsDebitBooking", "url":"booking.sepa.dd.NotOnUsDebitBooking"}],' +
'		"fields":[{"name":"amount", "type":"Money"},' +
'		          {"name":"id", "type":"Integer"},' +
'		          {"name":"creditor", "type":"BusinessCurrentAccount"},' +
'		          {"name":"settlementDate", "type":"Date"}],' +
'		"events":[],' +
'		"states":[],' +
'		"transitions":[],' +
'		"externalMachines":[{"id":"externalmachine_DirectDebit", "label":"DirectDebit", "url":"booking.sepa.dd.DirectDebit", "referenceType":"in"}],' +
'		"transitionsToExternalMachines":[],' +
'		"transitionsFromExternalMachines":[]' +
'	}' +
']' +
''