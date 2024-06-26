import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatTable } from '@angular/material/table';
import { UtilityService } from 'app/shared/utility.service';


@Component({
    selector: 'app-investments',
    templateUrl: './investments.component.html',
    styleUrls: ['./investments.component.scss']
})
export class InvestmentsComponent implements OnInit {

    shareAllocations: any = {
        'anun2023': '20.65',
        'meena2023': '20.65',
        'jaya2023': '19.56',
        'sindhu2023': '19.56',
        'siddharth2023': '19.56'
    }

    activeTeamInvestmentMenu: any = {};

    teamInvestments: any = {
        "overall": {
            "metadata": {
                "grosspnl": 237,
                "tax": 264,
                "netpnl": -27,
                "traderShare": -7,
                "teamShare": -20
            },
            "totalInvestment": 50000,
            "currentValue": 67174,
            "profit": 17179,
            "loss": 4
        },
        "day1": {
            "metadata": {
                "grosspnl": 237,
                "tax": 264,
                "netpnl": -27,
                "traderShare": -7,
                "teamShare": -20
            },
            "date": "18-Dec-2023",
            "totalInvestment": 50000,
            "currentValue": 49980,
            "profit": 0,
            "loss": 20
        },
        "day2": {
            "metadata": {
                "grosspnl": 1695,
                "tax": 338,
                "netpnl": 1356,
                "traderShare": 339,
                "teamShare": 1017
            },
            "date": "19-Dec-2023",
            "totalInvestment": 49980,
            "currentValue": 50995,
            "profit": 1015,
            "loss": 0
        },
        "day3": {
            "metadata": {
                "grosspnl": 829,
                "tax": 399,
                "netpnl": 430,
                "traderShare": 107,
                "teamShare": 323
            },
            "date": "20-Dec-2023",
            "totalInvestment": 50995,
            "currentValue": 51315,
            "profit": 320,
            "loss": 0
        },
        "day4": {
            "metadata": {
                "grosspnl": 819,
                "tax": 160,
                "netpnl": 658,
                "traderShare": 164,
                "teamShare": 494
            },
            "date": "21-Dec-2023",
            "totalInvestment": 51315,
            "currentValue": 51805,
            "profit": 490,
            "loss": 0
        },
        "day5": {
            "metadata": {
                "grosspnl": 1535,
                "tax": 250,
                "netpnl": 1285,
                "traderShare": 321,
                "teamShare": 964
            },
            "date": "21-Dec-2023",
            "totalInvestment": 51805,
            "currentValue": 52769,
            "profit": 964,
            "loss": 0
        },
        "day6": {
            "metadata": {
                "grosspnl": 1535,
                "tax": 250,
                "netpnl": 1285,
                "traderShare": 321,
                "teamShare": 964
            },
            "date": "26-Dec-2023",
            "totalInvestment": 51106,
            "currentValue": 56731,
            "profit": 5625,
            "loss": 0
        },
        "day7": {
            "metadata": {
                "grosspnl": 1535,
                "tax": 250,
                "netpnl": 1285,
                "traderShare": 321,
                "teamShare": 964
            },
            "date": "27-Dec-2023",
            "totalInvestment": 56731,
            "currentValue": 67174,
            "profit": 10449,
            "loss": 0
        }
    };

    teamMembers: any = [
        {
            uid: "anun2023",
            name: "Anun",
            activeMenu: null,
            ledger: {
                "overall": {
                    "totalInvestment": 10000,
                    "currentValue": 13871,
                    "profit": 3875,
                    "loss": 4
                },
                "day1": {
                    "metadata": {
                        "grosspnl": 237,
                        "tax": 264,
                        "netpnl": -27
                    },
                    "date": "18-Dec-2023",
                    "totalInvestment": 10000,
                    "currentValue": 9996,
                    "profit": 0,
                    "loss": 4
                },
                "day2": {
                    "date": "19-Dec-2023",
                    "totalInvestment": 9996,
                    "currentValue": 10199,
                    "profit": 203,
                    "loss": 0
                },
                "day3": {
                    "date": "20-Dec-2023",
                    "totalInvestment": 10199,
                    "currentValue": 10263,
                    "profit": 64,
                    "loss": 0
                },
                "day4": {
                    "date": "21-Dec-2023",
                    "totalInvestment": 10263,
                    "currentValue": 10361,
                    "profit": 98,
                    "loss": 0
                },
                "day5": {
                    "metadata": {
                        "grosspnl": 1535,
                        "tax": 250,
                        "netpnl": 1285,
                        "traderShare": 321,
                        "teamShare": 964
                    },
                    "date": "22-Dec-2023",
                    "totalInvestment": 10361,
                    "currentValue": 10553,
                    "profit": 192,
                    "loss": 0
                },
                "day6": {
                    "metadata": {
                        "grosspnl": 1535,
                        "tax": 250,
                        "netpnl": 1285,
                        "traderShare": 321,
                        "teamShare": 964
                    },
                    "date": "26-Dec-2023",
                    "totalInvestment": 10553,
                    "currentValue": 11714,
                    "profit": 1161,
                    "loss": 0
                },
                "day7": {
                    "metadata": {
                        "grosspnl": 1535,
                        "tax": 250,
                        "netpnl": 1285,
                        "traderShare": 321,
                        "teamShare": 964
                    },
                    "date": "27-Dec-2023",
                    "totalInvestment": 11714,
                    "currentValue": 13871,
                    "profit": 2157,
                    "loss": 0
                }
            }
        },
        {
            uid: "meena2023",
            name: "Meena",
            activeMenu: null,
            ledger: {
                "overall": {
                    "totalInvestment": 10000,
                    "currentValue": 13871,
                    "profit": 3875,
                    "loss": 4
                },
                "day1": {
                    "metadata": {
                        "grosspnl": 237,
                        "tax": 264,
                        "netpnl": -27
                    },
                    "date": "18-Dec-2023",
                    "totalInvestment": 10000,
                    "currentValue": 9996,
                    "profit": 0,
                    "loss": 4
                },
                "day2": {
                    "date": "19-Dec-2023",
                    "totalInvestment": 9996,
                    "currentValue": 10199,
                    "profit": 203,
                    "loss": 0
                },
                "day3": {
                    "date": "20-Dec-2023",
                    "totalInvestment": 10199,
                    "currentValue": 10263,
                    "profit": 64,
                    "loss": 0
                },
                "day4": {
                    "date": "21-Dec-2023",
                    "totalInvestment": 10263,
                    "currentValue": 10361,
                    "profit": 98,
                    "loss": 0
                },
                "day5": {
                    "metadata": {
                        "grosspnl": 1535,
                        "tax": 250,
                        "netpnl": 1285,
                        "traderShare": 321,
                        "teamShare": 964
                    },
                    "date": "22-Dec-2023",
                    "totalInvestment": 10361,
                    "currentValue": 10553,
                    "profit": 192,
                    "loss": 0
                },
                "day6": {
                    "metadata": {
                        "grosspnl": 1535,
                        "tax": 250,
                        "netpnl": 1285,
                        "traderShare": 321,
                        "teamShare": 964
                    },
                    "date": "26-Dec-2023",
                    "totalInvestment": 10553,
                    "currentValue": 11714,
                    "profit": 1161,
                    "loss": 0
                },
                "day7": {
                    "metadata": {
                        "grosspnl": 1535,
                        "tax": 250,
                        "netpnl": 1285,
                        "traderShare": 321,
                        "teamShare": 964
                    },
                    "date": "27-Dec-2023",
                    "totalInvestment": 11714,
                    "currentValue": 13871,
                    "profit": 2157,
                    "loss": 0
                }
            }
        },
        {
            uid: "jaya2023",
            name: "Jayalakshmi",
            activeMenu: null,
            ledger: {
                "overall": {
                    "totalInvestment": 10000,
                    "currentValue": 13144,
                    "profit": 3144,
                    "loss": 0
                },
                "day1": {
                    "metadata": {
                        "grosspnl": 237,
                        "tax": 264,
                        "netpnl": -27
                    },
                    "date": "18-Dec-2023",
                    "totalInvestment": 10000,
                    "currentValue": 9996,
                    "profit": 0,
                    "loss": 4
                },
                "day2": {
                    "date": "19-Dec-2023",
                    "totalInvestment": 9996,
                    "currentValue": 10199,
                    "profit": 203,
                    "loss": 0
                },
                "day3": {
                    "date": "20-Dec-2023",
                    "totalInvestment": 10199,
                    "currentValue": 10263,
                    "profit": 64,
                    "loss": 0
                },
                "day4": {
                    "date": "21-Dec-2023",
                    "totalInvestment": 10263,
                    "currentValue": 10361,
                    "profit": 98,
                    "loss": 0
                },
                "day5": {
                    "metadata": {
                        "grosspnl": 1535,
                        "tax": 250,
                        "netpnl": 1285,
                        "traderShare": 321,
                        "teamShare": 964
                    },
                    "date": "22-Dec-2023",
                    "totalInvestment": 10361,
                    "currentValue": 10553,
                    "profit": 192,
                    "loss": 0,
                    "withdrawal": 553
                },
                "day6": {
                    "metadata": {
                        "grosspnl": 1535,
                        "tax": 250,
                        "netpnl": 1285,
                        "traderShare": 321,
                        "teamShare": 964
                    },
                    "date": "26-Dec-2023",
                    "totalInvestment": 10000,
                    "currentValue": 11100,
                    "profit": 1100,
                    "loss": 0
                },
                "day7": {
                    "metadata": {
                        "grosspnl": 1535,
                        "tax": 250,
                        "netpnl": 1285,
                        "traderShare": 321,
                        "teamShare": 964
                    },
                    "date": "27-Dec-2023",
                    "totalInvestment": 11100,
                    "currentValue": 13144,
                    "profit": 2044,
                    "loss": 0
                }
            }
        },
        {
            uid: "sindhu2023",
            name: "Sindhu",
            activeMenu: null,
            ledger: {
                "overall": {
                    "totalInvestment": 10000,
                    "currentValue": 13144,
                    "profit": 3144,
                    "loss": 0
                },
                "day1": {
                    "metadata": {
                        "grosspnl": 237,
                        "tax": 264,
                        "netpnl": -27
                    },
                    "date": "18-Dec-2023",
                    "totalInvestment": 10000,
                    "currentValue": 9996,
                    "profit": 0,
                    "loss": 4
                },
                "day2": {
                    "date": "19-Dec-2023",
                    "totalInvestment": 9996,
                    "currentValue": 10199,
                    "profit": 203,
                    "loss": 0
                },
                "day3": {
                    "date": "20-Dec-2023",
                    "totalInvestment": 10199,
                    "currentValue": 10263,
                    "profit": 64,
                    "loss": 0
                },
                "day4": {
                    "date": "21-Dec-2023",
                    "totalInvestment": 10263,
                    "currentValue": 10361,
                    "profit": 98,
                    "loss": 0
                },
                "day5": {
                    "metadata": {
                        "grosspnl": 1535,
                        "tax": 250,
                        "netpnl": 1285,
                        "traderShare": 321,
                        "teamShare": 964
                    },
                    "date": "22-Dec-2023",
                    "totalInvestment": 10361,
                    "currentValue": 10553,
                    "profit": 192,
                    "loss": 0,
                    "withdrawal": 553
                },
                "day6": {
                    "metadata": {
                        "grosspnl": 1535,
                        "tax": 250,
                        "netpnl": 1285,
                        "traderShare": 321,
                        "teamShare": 964
                    },
                    "date": "26-Dec-2023",
                    "totalInvestment": 10000,
                    "currentValue": 11100,
                    "profit": 1100,
                    "loss": 0
                },
                "day7": {
                    "metadata": {
                        "grosspnl": 1535,
                        "tax": 250,
                        "netpnl": 1285,
                        "traderShare": 321,
                        "teamShare": 964
                    },
                    "date": "27-Dec-2023",
                    "totalInvestment": 11100,
                    "currentValue": 13144,
                    "profit": 2044,
                    "loss": 0
                }
            }
        },
        {
            uid: "siddharth2023",
            name: "Siddharth",
            activeMenu: null,
            ledger: {
                "overall": {
                    "totalInvestment": 10000,
                    "currentValue": 13144,
                    "profit": 3144,
                    "loss": 0
                },
                "day1": {
                    "metadata": {
                        "grosspnl": 237,
                        "tax": 264,
                        "netpnl": -27
                    },
                    "date": "18-Dec-2023",
                    "totalInvestment": 10000,
                    "currentValue": 9996,
                    "profit": 0,
                    "loss": 4
                },
                "day2": {
                    "date": "19-Dec-2023",
                    "totalInvestment": 9996,
                    "currentValue": 10199,
                    "profit": 203,
                    "loss": 0
                },
                "day3": {
                    "date": "20-Dec-2023",
                    "totalInvestment": 10199,
                    "currentValue": 10263,
                    "profit": 64,
                    "loss": 0
                },
                "day4": {
                    "date": "21-Dec-2023",
                    "totalInvestment": 10263,
                    "currentValue": 10361,
                    "profit": 98,
                    "loss": 0
                },
                "day5": {
                    "metadata": {
                        "grosspnl": 1535,
                        "tax": 250,
                        "netpnl": 1285,
                        "traderShare": 321,
                        "teamShare": 964
                    },
                    "date": "22-Dec-2023",
                    "totalInvestment": 10361,
                    "currentValue": 10553,
                    "profit": 192,
                    "loss": 0,
                    "withdrawal": 553
                },
                "day6": {
                    "metadata": {
                        "grosspnl": 1535,
                        "tax": 250,
                        "netpnl": 1285,
                        "traderShare": 321,
                        "teamShare": 964
                    },
                    "date": "26-Dec-2023",
                    "totalInvestment": 10000,
                    "currentValue": 11100,
                    "profit": 1100,
                    "loss": 0
                },
                "day7": {
                    "metadata": {
                        "grosspnl": 1535,
                        "tax": 250,
                        "netpnl": 1285,
                        "traderShare": 321,
                        "teamShare": 964
                    },
                    "date": "27-Dec-2023",
                    "totalInvestment": 11100,
                    "currentValue": 13144,
                    "profit": 2044,
                    "loss": 0
                }
            }
        }
    ]

    data: any = {
        budgetDetails: {
            columns: ['investorName', 'investedAmount', 'currentValue', 'sharePercent'],
            rows: [
                { "investorName": "Jaya", "investedAmount": 10000, "investorId": "8me8ugind", "currentValue": 10202.50 },
                { "investorName": "Anun", "investedAmount": 10000, "investorId": "8vqtcd30j", "currentValue": 10202.50 },
                { "investorName": "Meenu", "investedAmount": 10000, "investorId": "8byqduk33", "currentValue": 10202.50 },
                { "investorName": "Sindhu", "investedAmount": 10000, "investorId": "88qnb8jtx", "currentValue": 10202.50 },
                { "investorName": "Siddharth", "investedAmount": 10000, "investorId": "867a516fc", "currentValue": 10202.50 }
            ]
        }
    };


    ngOnInit(): void {
        this.activeTeamInvestmentMenu = this.teamInvestments.overall;
    }

    onMenuItemSelect(type, option, teamObj?) {
        switch (type) {
            case 'teamInvestment':
                this.activeTeamInvestmentMenu = this.teamInvestments[option];
                break;

            case 'teamMember':
                teamObj.activeMenu = teamObj.ledger[option];
                break;
        }
    }
}
