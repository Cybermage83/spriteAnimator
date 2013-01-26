//Integration Services  - v 0.99
var ad = {
	_tile: 0,
	ord: Math.floor(999999999*Math.random()),
    dc: {
        _svr: "http://ad.doubleclick.net",
        _method: "adj",
		_url: "",
		_kw: "",
		_meta: "",
		_reg: "",
		_rs: "",
		_adv: "",
		_sid: "",
		_u: "",
		tile: function() {
			return ++ad._tile;
		},
	    tag: function(data, tile, id) {
			try {
				if(typeof data == 'undefined'){
                    return "";
                }
				var s3  = (data.dc.s3)?";s3="+data.dc.s3:"";
				var s4  = (data.dc.s4)?";s4="+data.dc.s4:"";
				var hub = (data.dc.hub)?";hub="+data.dc.hub:"";
				var col = (data.col)?";col="+data.col:"";
				var pageid = "";//";pageid=" + data.pageid
				var cus = "";//";" + data.site + "=ad"
				var idd = id.split('-');
				var tag = this._svr + "/" + this._method + "/" + data.dc.site + this.dcopt(tile) +";comp=" + this.adv(window.location) + ";s1=" + (data.dc.s1||"") + ";s2=" + (data.dc.s2||"") + s3 + s4 + hub + ";pos=" + idd[0] + ";ptype=" + data.ptype + pageid + col + ";url=" + this.url(window.location.pathname) + this.kw(window.location) + this.meta(5,'full') + cus;
				tag += this.revsci.get() + this.sid() + this.reginfo() + ";sz=" + idd[1].replace(/_/g,",") + ";tile=" + tile + this.u([s3,s4,hub,col]) + ";!c=;ord=" + ad.ord + "?";
		        return (this._method=='adj')?"<scr" + "ipt src=\"" + tag + "\" type=\"text/javascript\"></scr"+ "ipt>":tag;
			} catch (err) { return ""; }
			
		},		
		spo: function(data, tile, id) {
            if (data.spo!=undefined) {
                var d = utils.cloneObject(data); 
                d.dc = d.spo;
                var data = d;
            }
            return this.tag(data, tile, id);
        }, 
        
		url: function(u) {
	        if (this._url=="") {
				this._url = u.substr(1).split("/").join("_").split(".")[0].replace(/[^a-z0-9_-]/g,'');
			}
			return this._url;
		},
		dcopt: function(t) {
			return (t==1)?';dcopt=ist':'';
		},
	    kw: function(u) {
	        var p = ";kw=";
			if (this._kw==""&&this._kw!="-") {
	        	this._kw = ad.util.param(u, 'q')||ad.util.param(u, 'searchString')||'-';
			}
			if (this._kw=="-") {return "";}
			return p + this._kw;
		},
		meta: function(n,m) {
			if (this._meta==""&&this._meta!="-") {
				var keys = '';
		        var m = document.getElementsByTagName('meta');
		        for(var i in m){
		            if(m[i].name == 'keywords'){
		                keys = m[i].content;
		                break;
		            }
		        }
				if (keys=='') {
					this._meta = '-';
				} else {
		        	if (m=='full') {
						this._meta = keys.split(',').slice(0,n).join(',').replace(/ *, */g,",").replace(/ /g,"-").replace(/[^a-z,-]/g,"");
					}
		       		if (m=='tags') {
						var karr = keys.split(',').slice(0,n);
						var len = karr.length;
						var x, k = '';
						for (var t=0;t<len;t++) {
							x = karr[t].replace(/ */g," ").replace(/ /g,"-").replace(/[^a-z,-]/g,"");
							k += "m"+ (t+1) + "=" + x;
						}
						this._meta = k;
					}
				}
			}
			if (this._meta=="-") {return "";}
			return this._meta;
		},
	    reginfo: function() {
	        if (this._reg==""&&this._reg!="-") {
				this._reg = (ad.util.cookie("p_AD"))?';'+ad.util.cookie("p_AD").substring(0,ad.util.cookie("p_AD").length-1)+"united_states".replace(/&amp;/g,";"):'-';
			}
			if (this._reg=="-") {return "";}
			return this._reg;
		},
		revsci: {
			get: function() {
	        	if (ad.dc._rs=="") {
					var rsinetsegs = [];	
			        var segs = ";segs=" + window.rsinetsegs.slice(0,10).join(";segs=");
					ad.dc._rs = segs;
				}
				return ad.dc._rs;
			}
		},
	    sid: function() {
	        var p = ";sid=";
	        if (this._sid==""&&this._sid!="-") {
	        	this._sid = ad.util.cookie('surround')||'-';
			}
			if (this._sid=="-") {return "";}
			return p + this._sid;
		},
	    adv: function(u) {
	        var p = ";adv=";
			if (this._adv==""&&this._adv!="-") {
	        	this._adv = ad.util.param(u, 'test')||ad.util.param(u, 'adv')||'-';
			}
			if (this._adv=="-") {return "";}
			return p + this._adv;
		},
	    u: function(info) {
	        var p = ";u=";
			var a = info.join('');
			if (this._u==""&&this._u!="-") {
				if (a=='') {
					this._u = '-';
				} else {
					var len = info.length;
					var x = '';
					var k = [];
					for (var t=0;t<len;t++) {
						x = info[t].replace(/;/g,"");
						if (x) {
							k[k.length] = x;
						}
					}
					k = k.join('|');
					this._u = k;
				}
			}
			if (this._u=="-") {return "";}
			return p + this._u;
		}
    },
    qu: {
        _svr: "ads.adsonar.com",
		_path: "http://js.adsonar.com/js/adsonar.js",
	    getSize: function(data, id) {
			var qu = data.qu[id];
			return {width: qu.width, height: qu.height};
		},
	    tag: function(data, id) {
			var qu = data.qu[id];
	        var tag = "<style type=\"text/css\">html,body{border:0;margin:0;padding:0;}</style><scr" + "ipt type=\"text/javascript\">var adsonar_placementId="+qu.placeid+",adsonar_pid="+qu.pid+",adsonar_ps="+qu.ps+",adsonar_zw="+qu.width+" ,adsonar_rfu=\""+window.document.location+"\";adsonar_zh="+qu.height+",adsonar_jv=\""+ad.qu._svr+"\";</scr"+ "ipt>";//document.write(\"<iframe src='http://www.google.com'></iframe>\");
	        tag += "<scr" + "ipt src=\"" + ad.qu._path + "\" type=\"text/javascript\"></scr"+ "ipt>";
	        return tag;
		}
    },
    hbx: {
		strip: function(a) {
			a = a.split("|").join("");
			a = a.split("&").join("");
			a = a.split("'").join("");
			a = a.split("#").join("");
			a = a.split("$").join("");
			a = a.split("%").join("");
			a = a.split("^").join("");
			a = a.split("*").join("");
			a = a.split(":").join("");
			a = a.split("!").join("");
			a = a.split("<").join("");
			a = a.split(">").join("");
			a = a.split("~").join("");
			a = a.split(";").join("");
			a = a.split(" ").join("+");
			return a;
		},
		evt: function(a,b) {
			b=_hbE[_hbEC++]={};
			b._N=a;
			b._C=0;
			return b;
		},
		meta: function(n,pn) {
			var keys = '';
		    var m = document.getElementsByTagName('meta');
		    for(var i in m){
		        if(m[i].name == 'keywords'){
		            keys = m[i].content;
		            break;
		        }
		    }
			if (keys!='') {
				var karr = keys.split(',').slice(0,n);
				var len = karr.length;
				var x, k = '';
				for (var t=0;t<len;t++) {
					x = karr[t];
					k += this.strip(x) + "|" + pn;
					if (t<len-1) {
						k += ",";
					}
				}
	            return k
			}
			return "";
		}
    },
	util: {
		getLRC: function(s) {
	        if (s=="") { return 0; }
	        var len = s.length;
	        var lrc = 0;
	        for (var i = 0;i < len;i++) {
	            lrc += lrc ^ s.charCodeAt(i);
	        }
	        return lrc;
	    },
		param: function(u, name) {
			var match=(new RegExp("[\\?&#]"+name+"=([^&#]*)")).exec(u);
			if (!match) {
				return '';
			} else {
				return match[1].replace(/[^a-zA-Z0-9]/g, "");
			}
		},
		cookie: $.cookie || function(name, value, options) {
			if (typeof value != 'undefined') {
				options = options || {};
				if (value === null) {
					value = '';
					options.expires = -1;
				}
				var expires = '';
				if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
					var date;
					if (typeof options.expires == 'number') {
						date = new Date();
						date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
					} else {
						date = options.expires;
					}
					expires = '; expires=' + date.toUTCString();
				}
				var path = options.path ? '; path=' + (options.path) : '';
				var domain = options.domain ? '; domain=' + (options.domain) : '';
				var secure = options.secure ? '; secure' : '';
				document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
			} else {
				var cookieValue = null;
				if (document.cookie && document.cookie != '') {
					var cookies = document.cookie.split(';');
					for (var i = 0; i < cookies.length; i++) {
						var cookie = ad.util.trim(cookies[i]);
						if (cookie.substring(0, name.length + 1) == (name + '=')) {
							cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
							break;
						}
					}
				}
				return cookieValue;
			}
			return "";
		},
		trim: $.trim || function(s) {
			return s.replace(/^\s+|\s+$/g,"");
		}
	},
	lookup: function(d) {
		var key = d.path.split('/').slice(1).join('_').toLowerCase();
		var data = d2009_client_data[key]||d2009_client_data.generic;
		if (!data.dc.site) {
			var p = d.path.split('/');
			data.dc.site=d.site+'/'+p.slice(2).join('/').toLowerCase();
			data.dc.s1=p.slice(2)[0].toLowerCase();
			data.dc.s2=p.slice(3)[0].toLowerCase();
		}
		if (d.ctype=='front') {
			data.dc.site = data.dc.site+'/index';
			data.dc.s2 = 'index';
		}
		if (d.ctype=='person') {
            var p = d.path.split('/');
            data.dc.site=d.site+'/'+p.slice(2).join('/').toLowerCase();
            data.dc.s1=p.slice(2)[0].toLowerCase();
            data.dc.s2=p.slice(3)[0].toLowerCase();
        } 
		if (d.leaf=='Classification') {
			var category = "";
			var p = "";
			var s1, s2, s3;
			if (d.categories.length > 0) {
				category = d.categories[0];
				p = category.toLowerCase().replace(/ /g,"-").replace(/[^a-zA-Z\/-]/g,"").split('/');
				data.dc.s1 = s1 = p.slice(1)[0];
				data.dc.s2 = s2 = p.slice(2)[0];
				data.dc.s3 = s3 = p.slice(3)[0];
				p[1]="category";
				data.dc.site=d.site+p.join('/');
			}
		}
		if (d.ptype=='slideshow') {
			data.dc.site = data.dc.site+'/slideshow';
		}
		if (!data.dc.site) {
			var p = d.path.split('/');
			data.dc.site=d.site+'/'+p.slice(2).join('/').toLowerCase();
			data.dc.s1=p.slice(2)[0].toLowerCase();
			data.dc.s2=p.slice(3)[0].toLowerCase();
		}
		data.site = d.site;
		data.ptype = d.ptype;
		data.pageid = d.pageid;
		data.col = (d.path.indexOf('/columns/')!=-1)?d.leaf:'';
		return data;
	}
};

var d2009_client_data = {
	generic: {
		"dc": {"site": "","s1": "","s2": ""},
		"qu": {
			"qu_channel_1": {"placeid": 1471746, "pid": 1369767, "ps": -1, "width": 405, "height": 220},
			"qu_story_1":   {"placeid": 1474908, "pid": 1369767, "ps": -1, "width": 328, "height": 220}
		},
		"hbx": {"pn": "Root"}
	},
	home_opinion: {
		"dc": {"site": "fnc/opinion","s1": "opinion","s2": ""},
		"qu": {
			"qu_channel_1": {"placeid": 1471746, "pid": 1369767, "ps": -1, "width": 405, "height": 220},
			"qu_story_1":   {"placeid": 1474908, "pid": 1369767, "ps": -1, "width": 328, "height": 220},
			"qu_story_2":   {"placeid": 1487408, "pid": 1369767, "ps": -1, "width": 190, "height": 184}
		}
	},
	home_opinion_columns_heritage: {
		"dc": {"site": "fnc/opinion/heritage","s1": "opinion","s2": "heritage"},
		"qu": {
			"qu_channel_1": {"placeid": 1471746, "pid": 1369767, "ps": -1, "width": 405, "height": 220},
			"qu_story_1":   {"placeid": 1474908, "pid": 1369767, "ps": -1, "width": 328, "height": 220},
			"qu_story_2":   {"placeid": 1487408, "pid": 1369767, "ps": -1, "width": 190, "height": 184}
		}
	},
	home_opinion_columns_theverdict: {
		"dc": {"site": "fnc/opinion/theverdict","s1": "opinion","s2": "theverdict"},
		"qu": {
			"qu_channel_1": {"placeid": 1471746, "pid": 1369767, "ps": -1, "width": 405, "height": 220},
			"qu_story_1":   {"placeid": 1474908, "pid": 1369767, "ps": -1, "width": 328, "height": 220},
			"qu_story_2":   {"placeid": 1487408, "pid": 1369767, "ps": -1, "width": 190, "height": 184}
		}
	},
	home_entertainment: {
		"spo": {"site": "fnc/entertainment","s1": "entertainment","s2": ""},
        "dc": {"site": "fnc/entertainment","s1": "entertainment","s2": ""},
        "qu": {
            "qu_channel_1": {"placeid": 1484508, "pid": 1368767, "ps": -1, "width": 405, "height": 220},
            "qu_story_1": {"placeid": 1484511, "pid": 1368767, "ps": -1, "width": 328, "height": 220},
            "qu_story_2": {"placeid": 1487431, "pid": 1369767, "ps": -1, "width": 190, "height": 184}
        }
    },
    home_entertainment_movies:{
	    "spo": {"site": "fnc/entertainment/movies","s1": "entertainment","s2":"movies"},
        "dc": {"site": "fnc/entertainment/movies","s1": "entertainment","s2":"movies"},
        "qu": {
            "qu_channel_1": {"placeid": 1484508, "pid": 1368767, "ps": -1, "width": 405, "height": 220},
            "qu_story_1": {"placeid": 1484511, "pid": 1368767, "ps": -1, "width": 328, "height": 220},
            "qu_story_2": {"placeid": 1487431, "pid": 1369767, "ps": -1, "width": 190, "height": 184}
        }
    },
    home_entertainment_music:{
	    "spo": {"site": "fnc/entertainment/music","s1": "entertainment","s2":"music"},
        "dc": {"site": "fnc/entertainment/music","s1": "entertainment","s2": "music"},
        "qu": {
            "qu_channel_1": {"placeid": 1484508, "pid": 1368767, "ps": -1, "width": 405, "height": 220},
            "qu_story_1": {"placeid": 1484511, "pid": 1368767, "ps": -1, "width": 328, "height": 220},
            "qu_story_2": {"placeid": 1487431, "pid": 1369767, "ps": -1, "width": 190, "height": 184}
        }
    },
    home_entertainment_tv:{
	    "spo": {"site": "fnc/entertainment/tv","s1": "entertainment","s2": "tv"},
        "dc": {"site": "fnc/entertainment/tv","s1": "entertainment","s2": "tv"},
        "qu": {
            "qu_channel_1": {"placeid": 1484508, "pid": 1368767, "ps": -1, "width": 405, "height": 220},
            "qu_story_1": {"placeid": 1484511, "pid": 1368767, "ps": -1, "width": 328, "height": 220},
            "qu_story_2": {"placeid": 1487431, "pid": 1369767, "ps": -1, "width": 190, "height": 184}
        }
    },
    home_entertainment_tv_realitycheck:{
        "spo": {"site": "fnc/entertainment/tv/realitycheck","s1": "entertainment","s2": "tv","s3":"realitycheck"},
        "dc": {"site": "fnc/entertainment/tv/realitycheck","s1": "entertainment","s2": "tv","s3":"realitycheck"},
        "qu": {
            "qu_channel_1": {"placeid": 1484508, "pid": 1368767, "ps": -1, "width": 405, "height": 220},
            "qu_story_1": {"placeid": 1484511, "pid": 1368767, "ps": -1, "width": 328, "height": 220},
            "qu_story_2": {"placeid": 1487431, "pid": 1369767, "ps": -1, "width": 190, "height": 184}
        }
    },
    home_entertainment_style:{
	    "spo": {"site": "fnc/entertainment/style","s1": "entertainment","s2": "style"},
        "dc": {"site": "fnc/entertainment/style","s1": "entertainment","s2": "style"},
        "qu": {
            "qu_channel_1": {"placeid": 1484508, "pid": 1368767, "ps": -1, "width": 405, "height": 220},
            "qu_story_1": {"placeid": 1484511, "pid": 1368767, "ps": -1, "width": 328, "height": 220},
            "qu_story_2": {"placeid": 1487431, "pid": 1369767, "ps": -1, "width": 190, "height": 184}
        }
    },
    home_entertainment_gossip:{
	    "spo": {"site": "fnc/entertainment/gossip","s1": "entertainment","s2": "gossip"},
        "dc": {"site": "fnc/entertainment/gossip","s1": "entertainment","s2": "gossip"},
        "qu": {
            "qu_channel_1": {"placeid": 1484508, "pid": 1368767, "ps": -1, "width": 405, "height": 220},
            "qu_story_1": {"placeid": 1484511, "pid": 1368767, "ps": -1, "width": 328, "height": 220},
            "qu_story_2": {"placeid": 1487431, "pid": 1369767, "ps": -1, "width": 190, "height": 184}
        }
    },
    home_entertainment_gossip_poptarts:{
	    "spo": {"site": "fnc/entertainment/gossip/poptarts","s1": "entertainment","s2": "gossip","s3":"poptarts"},
        "dc": {"site": "fnc/entertainment/gossip/poptarts","s1": "entertainment","s2": "gossip","s3":"poptarts"},
        "qu": {
            "qu_channel_1": {"placeid": 1484508, "pid": 1368767, "ps": -1, "width": 405, "height": 220},
            "qu_story_1": {"placeid": 1484511, "pid": 1368767, "ps": -1, "width": 328, "height": 220},
            "qu_story_2": {"placeid": 1487431, "pid": 1369767, "ps": -1, "width": 190, "height": 184}
        }
    }, 
    
  	home_health: {
		"dc": {"site": "fnc/health","s1": "health","s2": ""},
		"qu": {
			"qu_channel_1": {"placeid": 1471746, "pid": 1369767, "ps": -1, "width": 405, "height": 220},
			"qu_story_1":   {"placeid": 1474908, "pid": 1369767, "ps": -1, "width": 328, "height": 220}
		}
	},
	home_us: {
		"dc": {"site": "fnc/us","s1": "us","s2": ""},
		"qu": {
			"qu_channel_1": {"placeid": 1471746, "pid": 1369767, "ps": -1, "width": 405, "height": 220},
			"qu_story_1":   {"placeid": 1474908, "pid": 1369767, "ps": -1, "width": 328, "height": 220}
		}
	},
	home_world: {
		"dc": {"site": "fnc/world","s1": "world","s2": ""},
		"qu": {
			"qu_channel_1": {"placeid": 1471746, "pid": 1369767, "ps": -1, "width": 405, "height": 220},
			"qu_story_1":   {"placeid": 1474908, "pid": 1369767, "ps": -1, "width": 328, "height": 220}
		}
	},
	home_scitech: {
		"dc": {"site": "fnc/scitech","s1": "scitech","s2": ""},
		"qu": {
			"qu_channel_1": {"placeid": 1471746, "pid": 1369767, "ps": -1, "width": 405, "height": 220},
			"qu_story_1":   {"placeid": 1474908, "pid": 1369767, "ps": -1, "width": 328, "height": 220}
		}
	},
	home_leisure: {
		"dc": {"site": "fnc/leisure","s1": "leisure","s2": ""},
		"qu": {
			"qu_channel_1": {"placeid": 1471746, "pid": 1369767, "ps": -1, "width": 405, "height": 220},
			"qu_story_1":   {"placeid": 1474908, "pid": 1369767, "ps": -1, "width": 328, "height": 220}
		}
	},
	home_sports: {
		"dc": {"site": "fnc/sports","s1": "sports","s2": ""},
		"qu": {
			"qu_channel_1": {"placeid": 1471746, "pid": 1369767, "ps": -1, "width": 405, "height": 220},
			"qu_story_1":   {"placeid": 1474908, "pid": 1369767, "ps": -1, "width": 328, "height": 220}
		}
	},
	home_politics: {
		"spo": {"site": "fnc/politics","s1": "politics","s2": ""},
	    "dc": {"site": "fnc/politics","s1": "politics","s2": ""},
		"qu": {
		  "qu_channel_1": {"placeid": 1486891, "pid": 423757, "ps": -1, "width": 405, "height": 220},
		  "qu_story_1":   {"placeid": 1486888, "pid": 423757, "ps": -1, "width": 328, "height": 220},
		  "qu_story_2":   {"placeid": 1487428, "pid": 423757, "ps": -1, "width": 190, "height": 184}
	    }
	},
	home_politics_president: {
    	"spo": {"site": "fnc/politics/president","s1": "politics","s2": "president"},
	    "dc": {"site": "fnc/politics/president","s1": "politics","s2": "president"},
		"qu": {
		  "qu_channel_1": {"placeid": 1486891, "pid": 423757, "ps": -1, "width": 405, "height": 220},
		  "qu_story_1":   {"placeid": 1486888, "pid": 423757, "ps": -1, "width": 328, "height": 220},
		  "qu_story_2":   {"placeid": 1487428, "pid": 423757, "ps": -1, "width": 190, "height": 184}
	    }
	},
	home_politics_senate: {
    	"spo": {"site": "fnc/politics/senate","s1": "politics","s2": "senate"},
	    "dc": {"site": "fnc/politics/senate","s1": "politics","s2": "senate"},
		"qu": {
		  "qu_channel_1": {"placeid": 1486891, "pid": 423757, "ps": -1, "width": 405, "height": 220},
		  "qu_story_1":   {"placeid": 1486888, "pid": 423757, "ps": -1, "width": 328, "height": 220},
		  "qu_story_2":   {"placeid": 1487428, "pid": 423757, "ps": -1, "width": 190, "height": 184}
	    }
	},
	home_politics_house: {
    	"spo": {"site": "fnc/politics/house","s1": "politics","s2": "house"},
	    "dc": {"site": "fnc/politics/house","s1": "politics","s2": "house"},
		"qu": {
		  "qu_channel_1": {"placeid": 1486891, "pid": 423757, "ps": -1, "width": 405, "height": 220},
		  "qu_story_1":   {"placeid": 1486888, "pid": 423757, "ps": -1, "width": 328, "height": 220},
		  "qu_story_2":   {"placeid": 1487428, "pid": 423757, "ps": -1, "width": 190, "height": 184}
	    }
	},
	home_politics_courts: {
    	"spo": {"site": "fnc/politics/courts","s1": "politics","s2": "courts"},
	    "dc": {"site": "fnc/politics/courts","s1": "politics","s2": "courts"},
		"qu": {
		  "qu_channel_1": {"placeid": 1486891, "pid": 423757, "ps": -1, "width": 405, "height": 220},
		  "qu_story_1":   {"placeid": 1486888, "pid": 423757, "ps": -1, "width": 328, "height": 220},
		  "qu_story_2":   {"placeid": 1487428, "pid": 423757, "ps": -1, "width": 190, "height": 184}
	    }
	},
	"home_politics_state-local": {
    	"spo": {"site": "fnc/politics/government","s1": "politics","s2": "government"},
	    "dc": {"site": "fnc/politics/government","s1": "politics","s2": "government"},
		"qu": {
		  "qu_channel_1": {"placeid": 1486891, "pid": 423757, "ps": -1, "width": 405, "height": 220},
		  "qu_story_1":   {"placeid": 1486888, "pid": 423757, "ps": -1, "width": 328, "height": 220},
		  "qu_story_2":   {"placeid": 1487428, "pid": 423757, "ps": -1, "width": 190, "height": 184}
	    }
	},
	home_politics_pentagon: {
    	"spo": {"site": "fnc/politics/pentagon","s1": "politics","s2": "pentagon"},
	    "dc": {"site": "fnc/politics/pentagon","s1": "politics","s2": "pentagon"},
		"qu": {
		  "qu_channel_1": {"placeid": 1486891, "pid": 423757, "ps": -1, "width": 405, "height": 220},
		  "qu_story_1":   {"placeid": 1486888, "pid": 423757, "ps": -1, "width": 328, "height": 220},
		  "qu_story_2":   {"placeid": 1487428, "pid": 423757, "ps": -1, "width": 190, "height": 184}
	    }
	},
	home_politics_president_first100days: {
    	"spo": {"site": "fnc/politics/first100days","s1": "politics","s2": "first100days"},
	    "dc": {"site": "fnc/politics/first100days","s1": "politics","s2": "first100days"},
		"qu": {
		  "qu_channel_1": {"placeid": 1486891, "pid": 423757, "ps": -1, "width": 405, "height": 220},
		  "qu_story_1":   {"placeid": 1486888, "pid": 423757, "ps": -1, "width": 328, "height": 220},
		  "qu_story_2":   {"placeid": 1487428, "pid": 423757, "ps": -1, "width": 190, "height": 184}
	    }
	},
	
    home_columnists: {
        "dc": {"site": "fnc/columnists","s1": "columnists","s2": ""},
        "qu": {
            "qu_channel_1": {"placeid": 1471746, "pid": 1369767, "ps": -1, "width": 405, "height": 220},
            "qu_story_1":   {"placeid": 1474908, "pid": 1369767, "ps": -1, "width": 328, "height": 220}
        }
    },
    
    home_sbc: {
        "spo": {"site": "fsb/root","s1": "","s2": ""}, 
        "dc": {"site": "fsb/root","s1": "","s2": ""},
        "qu": {
                    "qu_channel_1": {"placeid": 00000, "pid": 00000, "ps": -1, "width": 100, "height": 100},
                    "qu_story_1":  {"placeid": 00000, "pid": 00000, "ps": -1, "width": 100, "height": 100}
        }
    },
	home_sbc_humanresources: {
        "spo": {"site": "fsb/humanresources","s1": "humanresources","s2": ""}, 
        "dc": {"site": "fsb/humanresources","s1": "humanresources","s2": ""},
        "qu": {
                    "qu_channel_1": {"placeid": 00000, "pid": 00000, "ps": -1, "width": 100, "height": 100},
                    "qu_story_1":  {"placeid": 00000, "pid": 00000, "ps": -1, "width": 100, "height": 100}
        }
    },
	home_sbc_networking: {
        "spo": {"site": "fsb/networking","s1": "networking","s2": ""}, 
        "dc": {"site": "fsb/networking","s1": "networking","s2": ""},
        "qu": {
                    "qu_channel_1": {"placeid": 00000, "pid": 00000, "ps": -1, "width": 100, "height": 100},
                    "qu_story_1":  {"placeid": 00000, "pid": 00000, "ps": -1, "width": 100, "height": 100}
        }
    },
	home_sbc_entrepreneurs: {
        "spo": {"site": "fsb/entrepreneurs","s1": "entrepreneurs","s2": ""}, 
        "dc": {"site": "fsb/entrepreneurs","s1": "entrepreneurs","s2": ""},
        "qu": {
                    "qu_channel_1": {"placeid": 00000, "pid": 00000, "ps": -1, "width": 100, "height": 100},
                    "qu_story_1":  {"placeid": 00000, "pid": 00000, "ps": -1, "width": 100, "height": 100}
        }
    },
	home_sbc_finance: {
        "spo": {"site": "fsb/finance","s1": "finance","s2": ""}, 
        "dc": {"site": "fsb/finance","s1": "finance","s2": ""},
        "qu": {
                    "qu_channel_1": {"placeid": 00000, "pid": 00000, "ps": -1, "width": 100, "height": 100},
                    "qu_story_1":  {"placeid": 00000, "pid": 00000, "ps": -1, "width": 100, "height": 100}
        }
    },
	home_sbc_strategy: {
        "spo": {"site": "fsb/strategy","s1": "strategy","s2": ""}, 
        "dc": {"site": "fsb/strategy","s1": "strategy","s2": ""},
        "qu": {
                    "qu_channel_1": {"placeid": 00000, "pid": 00000, "ps": -1, "width": 100, "height": 100},
                    "qu_story_1":  {"placeid": 00000, "pid": 00000, "ps": -1, "width": 100, "height": 100}
        }
    },
	home_sbc_technology: {
        "spo": {"site": "fsb/technology","s1": "technology","s2": ""}, 
        "dc": {"site": "fsb/technology","s1": "technology","s2": ""},
        "qu": {
                    "qu_channel_1": {"placeid": 00000, "pid": 00000, "ps": -1, "width": 100, "height": 100},
                    "qu_story_1":  {"placeid": 00000, "pid": 00000, "ps": -1, "width": 100, "height": 100}
        }
    },

    home_scitech: { 
        "spo": {"site": "fnc/scitech","s1": "scitech","s2": ""}, 
        "dc": {"site": "fnc/scitech","s1": "scitech","s2": ""}, 
        "qu": { 
        	"qu_channel_1": {"placeid": 1486891, "pid": 423757, "ps": -1, "width": 405, "height": 220}, 
		"qu_story_1": {"placeid": 1486888, "pid": 423757, "ps": -1, "width": 328, "height": 220}, 
		        	"qu_story_2": {"placeid": 1487428, "pid": 423757, "ps": -1, "width": 190, "height": 184} 
		} 
    }, 
	"home_scitech_air-space": { 
	    "spo": {"site": "fnc/scitech/air-space","s1": "scitech","s2": "air-space"}, 
		"dc": {"site": "fnc/scitech/air-space","s1": "scitech","s2": "air-space"}, 
		"qu": { 
		"qu_channel_1": {"placeid": 1486891, "pid": 423757, "ps": -1, "width": 405, "height": 220}, 
		"qu_story_1": {"placeid": 1486888, "pid": 423757, "ps": -1, "width": 328, "height": 220}, 
		"qu_story_2": {"placeid": 1487428, "pid": 423757, "ps": -1, "width": 190, "height": 184} 
		} 
	}, 
	home_scitech_archaeology: { 
	    "spo": {"site": "fnc/scitech/archaeology","s1": "scitech","s2": "archaeology"}, 
		"dc": {"site": "fnc/scitech/archaeology","s1": "scitech","s2": "archaeology"}, 
		"qu": { 
		"qu_channel_1": {"placeid": 1486891, "pid": 423757, "ps": -1, "width": 405, "height": 220}, 
		"qu_story_1": {"placeid": 1486888, "pid": 423757, "ps": -1, "width": 328, "height": 220}, 
		"qu_story_2": {"placeid": 1487428, "pid": 423757, "ps": -1, "width": 190, "height": 184} 
		} 
	}, 
	home_scitech_dinosaurs: { 
		"spo": {"site": "fnc/scitech/dinosaurs","s1": "scitech","s2": "dinosaurs"}, 
		"dc": {"site": "fnc/scitech/dinosaurs","s1": "scitech","s2": "dinosaurs"}, 
		"qu": { 
		"qu_channel_1": {"placeid": 1486891, "pid": 423757, "ps": -1, "width": 405, "height": 220}, 
		"qu_story_1": {"placeid": 1486888, "pid": 423757, "ps": -1, "width": 328, "height": 220}, 
		"qu_story_2": {"placeid": 1487428, "pid": 423757, "ps": -1, "width": 190, "height": 184} 
		} 
	}, 
	"home_scitech_planet-earth": { 
		"spo": {"site": "fnc/scitech/planet-earth","s1": "scitech","s2": "planet-earth"}, 
		"dc": {"site": "fnc/scitech/planet-earth","s1": "scitech","s2": "planet-earth"}, 
		"qu": { 
		"qu_channel_1": {"placeid": 1486891, "pid": 423757, "ps": -1, "width": 405, "height": 220}, 
		"qu_story_1": {"placeid": 1486888, "pid": 423757, "ps": -1, "width": 328, "height": 220}, 
		"qu_story_2": {"placeid": 1487428, "pid": 423757, "ps": -1, "width": 190, "height": 184} 
		} 
	}, 
	"home_scitech_wild-nature": { 
	    "spo": {"site": "fnc/scitech/wild-nature","s1": "scitech","s2": "wild-nature"}, 
		"dc": {"site": "fnc/scitech/wild-nature","s1": "scitech","s2": "wild-nature"}, 
		"qu": { 
		"qu_channel_1": {"placeid": 1486891, "pid": 423757, "ps": -1, "width": 405, "height": 220}, 
		"qu_story_1": {"placeid": 1486888, "pid": 423757, "ps": -1, "width": 328, "height": 220}, 
		"qu_story_2": {"placeid": 1487428, "pid": 423757, "ps": -1, "width": 190, "height": 184} 
		} 
	}, 
	home_scitech_science: { 
		"spo": {"site": "fnc/scitech/science","s1": "scitech","s2": "science"}, 
		"dc": {"site": "fnc/scitech/science","s1": "scitech","s2": "science"}, 
		"qu": { 
		"qu_channel_1": {"placeid": 1486891, "pid": 423757, "ps": -1, "width": 405, "height": 220}, 
		"qu_story_1": {"placeid": 1486888, "pid": 423757, "ps": -1, "width": 328, "height": 220}, 
		"qu_story_2": {"placeid": 1487428, "pid": 423757, "ps": -1, "width": 190, "height": 184} 
		} 
	}, 
	home_scitech_tech: { 
		"spo": {"site": "fnc/scitech/tech","s1": "scitech","s2": "tech"}, 
		"dc": {"site": "fnc/scitech/tech","s1": "scitech","s2": "tech"}, 
		"qu": { 
		"qu_channel_1": {"placeid": 1486891, "pid": 423757, "ps": -1, "width": 405, "height": 220}, 
		"qu_story_1": {"placeid": 1486888, "pid": 423757, "ps": -1, "width": 328, "height": 220}, 
		"qu_story_2": {"placeid": 1487428, "pid": 423757, "ps": -1, "width": 190, "height": 184} 
		} 
	}, 
	home_scitech_gadgets: { 
		"spo": {"site": "fnc/scitech/gadgets","s1": "scitech","s2": "gadgets"}, 
		"dc": {"site": "fnc/scitech/gadgets","s1": "scitech","s2": "gadgets"}, 
		"qu": { 
		"qu_channel_1": {"placeid": 1486891, "pid": 423757, "ps": -1, "width": 405, "height": 220}, 
		"qu_story_1": {"placeid": 1486888, "pid": 423757, "ps": -1, "width": 328, "height": 220}, 
		"qu_story_2": {"placeid": 1487428, "pid": 423757, "ps": -1, "width": 190, "height": 184} 
		} 
	}, 
	home_scitech_military: { 
		"spo": {"site": "fnc/scitech/military","s1": "scitech","s2": "military"}, 
		"dc": {"site": "fnc/scitech/military","s1": "scitech","s2": "military"}, 
		"qu": { 
		"qu_channel_1": {"placeid": 1486891, "pid": 423757, "ps": -1, "width": 405, "height": 220}, 
		"qu_story_1": {"placeid": 1486888, "pid": 423757, "ps": -1, "width": 328, "height": 220}, 
		"qu_story_2": {"placeid": 1487428, "pid": 423757, "ps": -1, "width": 190, "height": 184} 
		} 
	}, 
	"home_scitech_how-green": { 
		"spo": {"site": "fnc/scitech/planet-earth/how-green","s1": "scitech","s2": "planet-earth", "s3": "how-green"}, 
		"dc": {"site": "fnc/scitech/planet-earth/how-green","s1": "scitech","s2": "planet-earth", "s3": "how-green"}, 
		"qu": { 
		"qu_channel_1": {"placeid": 1486891, "pid": 423757, "ps": -1, "width": 405, "height": 220}, 
		"qu_story_1": {"placeid": 1486888, "pid": 423757, "ps": -1, "width": 328, "height": 220}, 
		"qu_story_2": {"placeid": 1487428, "pid": 423757, "ps": -1, "width": 190, "height": 184} 
		} 
	}, 
	"home_scitech_tech-tuesday": { 
		"spo": {"site": "fnc/scitech/tech/tech-tuesday","s1": "scitech","s2": "tech", "s3": "tech-tuesday"}, 
		"dc": {"site": "fnc/scitech/tech/tech-tuesday","s1": "scitech","s2": "tech", "s3": "tech-tuesday"}, 
		"qu": { 
		"qu_channel_1": {"placeid": 1486891, "pid": 423757, "ps": -1, "width": 405, "height": 220}, 
		"qu_story_1": {"placeid": 1486888, "pid": 423757, "ps": -1, "width": 328, "height": 220}, 
		"qu_story_2": {"placeid": 1487428, "pid": 423757, "ps": -1, "width": 190, "height": 184} 
		} 
	}, 
	"home_scitech_goof-proof-gadget-guide": { 
		"spo": {"site": "fnc/scitech/tech/goof-proof-gadget-guide","s1": "scitech", "s2": "tech", "s3": "goof-proof-gadget-guide"}, 
		"dc": {"site": "fnc/scitech/tech/goof-proof-gadget-guide","s1": "scitech", "s2": "tech", "s3": "goof-proof-gadget-guide"}, 
		"qu": { 
		"qu_channel_1": {"placeid": 1486891, "pid": 423757, "ps": -1, "width": 405, "height": 220}, 
		"qu_story_1": {"placeid": 1486888, "pid": 423757, "ps": -1, "width": 328, "height": 220}, 
		"qu_story_2": {"placeid": 1487428, "pid": 423757, "ps": -1, "width": 190, "height": 184} 
		} 
	} 
 };
(function($){

    function SpriteAnimator(param) {
        var SA = this;
        /*
            param {
                id  : "name"
                fps : "frames per second"
                dir : "direction basic: ltr/rtl
                stop: "stop second"
            }
        */

        SA.config = {//defaults
            id   :  '',
            fps  :  30,
            dir  : 'ltr',
            stop : {frame:null, callback:null},
            loop : false,
            startFrame : 0,
            endFrame   : -1,
            state      : 'play',
            placeHolder: '',
            settings   : {

            }
        };

        for(var x in param)//if different add new
        {
                if(param[x] !== SA.config[x])
                {
                    SA.config[x] = param[x];
                }
        }

        SA.sprite = {// Sprite object holder this is a temp spot
            spriteWidth  : null,
            spriteHeight : null,
            state        : SA.config.statet,
            curFrame     : SA.config.startFrame,
            endFrame     : SA.config.endFrame,
            spriteID     : null

        };

        this.init();
    }

    SpriteAnimator.prototype = {
        init: function(){
            var SA = this;
            log(SA.config.placeHolder);

            if(SA.config.placeHolder === '')
            {
                SA.getCSS();
                SA.setAnimate();
            }else{
                SA.getPlaceHolder();
            }


        },
        getPlaceHolder: function(){
            var SA  = this,
                cfg = SA.config;

            var elm = $(cfg.placeHolder);

            SA.placeHTime = setTimeout(function(){holder(); },100);

            function holder(){
                log(elm.length);
                if(elm.length > 0){
                    elm.css({"position":"relative"});
                    elm.append("<div class='sprite1'></div>");

                    clearTimeout(SA.placeHTime);
                    SA.getCSS();
                    SA.setAnimate();
                }else{
                    clearTimeout(SA.placeHTime);
                    SA.getPlaceHolder();
                }
            }
        },
        getCSS: function()
        {
            var SA  = this,
                cfg = SA.config,
                sprite = SA.sprite;

            sprite.spriteWidth = parseInt($(cfg.id).css('width'),10), sprite.spriteHeight = parseInt($(cfg.id).css('height'),10);
            log(sprite.spriteWidth);
            log(sprite.spriteHeight);
        },
        setAnimate: function(){
            var SA  = this,
                cfg = SA.config,
                sprite = SA.sprite;

            //if(sprite.state == 'stop' || sprite.state == null)
            //{
            if($(cfg.id).length >0){
                SA.animation();
            }else{
               SA.timeout = setTimeout(function(){SA.init(); log('timedout')},5000);
            }

            //}

        },
        animation: function()
        {
            var SA  = this,
                cfg = SA.config,
                sprite = SA.sprite;
            clearTimeout(SA.timeout);
                if(SA.sprite.state !== 'stop'){
                    sprite.spriteID =    setInterval(looper,1000/cfg.fps);
                }

            function looper()
            {
                var direction;
                //log(sprite.curFrame);
                if(cfg.dir === 'ltr' || cfg.dir === 'rtl')
                {
                    (cfg.dir !== 'ltr') ? direction = '-' : direction = '';

                    $(cfg.id).css('background-position' , direction+(sprite.curFrame * sprite.spriteWidth)+'px 0px');

                }else if (cfg.dir === 'utb' || cfg.dir === 'btu')
                {
                    (cfg.dir !== 'utb') ? direction = '' : direction = '-';

                    $(cfg.id).css('background-position' , '0px '+ direction+(sprite.curFrame * sprite.spriteHeight)+'px');

                }

                SA.sprite.state = 'play';
                sprite.curFrame = sprite.curFrame + 1;
                clearInterval(sprite.spriteID);
                if(cfg.stop.frame !==sprite.curFrame)
                {
                    if(sprite.curFrame == sprite.endFrame && !cfg.loop)
                    {
                        //alert('asd');
                        clearInterval(sprite.spriteID);
                        SA.sprite.state = 'stop';
                    }else if(sprite.curFrame == sprite.endFrame && cfg.loop)
                    {
                        sprite.curFrame = 0;
                    }
                }else if (cfg.stop.frame === sprite.curFrame){

                    //clearInterval(sprite.spriteID);
                    if($.isFunction(cfg.stop.callback))
                    {
                        //log(sprite.spriteID);
                        //sprite.curFrame = cfg.stop.callback();

                        //SA.setAnimate();


                    }
                }
                //log(sprite.curFrame+' '+cfg.stop.frame);
                SA.setAnimate();
            }
            log(cfg.id);
        }
    };

    function log(str){
        console.log(str);
    }

    $(document).ready(function(){

        var mySprite = new SpriteAnimator({id:'.sprite1',fps:'12',dir:'utb',endFrame:66,loop:true,placeHolder:'#weather-widget', stop:{frame:66, callback:function(){
            //return 118;
        }}});

    });

})(jQuery);


