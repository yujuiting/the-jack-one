/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	var parentJsonpFunction = window["webpackJsonp"];
/******/ 	window["webpackJsonp"] = function webpackJsonpCallback(chunkIds, moreModules, executeModules) {
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [], result;
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(chunkIds, moreModules, executeModules);
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/ 		if(executeModules) {
/******/ 			for(i=0; i < executeModules.length; i++) {
/******/ 				result = __webpack_require__(__webpack_require__.s = executeModules[i]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	};
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = this["webpackHotUpdate"];
/******/ 	this["webpackHotUpdate"] = 
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if(parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/ 	
/******/ 	function hotDownloadUpdateChunk(chunkId) { // eslint-disable-line no-unused-vars
/******/ 		var head = document.getElementsByTagName("head")[0];
/******/ 		var script = document.createElement("script");
/******/ 		script.type = "text/javascript";
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		;
/******/ 		head.appendChild(script);
/******/ 	}
/******/ 	
/******/ 	function hotDownloadManifest(requestTimeout) { // eslint-disable-line no-unused-vars
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if(typeof XMLHttpRequest === "undefined")
/******/ 				return reject(new Error("No browser support"));
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch(err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if(request.readyState !== 4) return;
/******/ 				if(request.status === 0) {
/******/ 					// timeout
/******/ 					reject(new Error("Manifest request to " + requestPath + " timed out."));
/******/ 				} else if(request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if(request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch(e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	
/******/ 	
/******/ 	var hotApplyOnUpdate = true;
/******/ 	var hotCurrentHash = "2eac3fb3dfb22f113bab"; // eslint-disable-line no-unused-vars
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentParents = []; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = []; // eslint-disable-line no-unused-vars
/******/ 	
/******/ 	function hotCreateRequire(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var me = installedModules[moduleId];
/******/ 		if(!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if(me.hot.active) {
/******/ 				if(installedModules[request]) {
/******/ 					if(installedModules[request].parents.indexOf(moduleId) < 0)
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if(me.children.indexOf(request) < 0)
/******/ 					me.children.push(request);
/******/ 			} else {
/******/ 				console.warn("[HMR] unexpected require(" + request + ") from disposed module " + moduleId);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for(var name in __webpack_require__) {
/******/ 			if(Object.prototype.hasOwnProperty.call(__webpack_require__, name) && name !== "e") {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if(hotStatus === "ready")
/******/ 				hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/ 	
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if(hotStatus === "prepare") {
/******/ 					if(!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if(hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/ 	
/******/ 	function hotCreateModule(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/ 	
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfAccepted = true;
/******/ 				else if(typeof dep === "function")
/******/ 					hot._selfAccepted = dep;
/******/ 				else if(typeof dep === "object")
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else
/******/ 					hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfDeclined = true;
/******/ 				else if(typeof dep === "object")
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else
/******/ 					hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if(idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if(!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if(idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/ 	
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/ 	
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for(var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/ 	
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/ 	
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/ 	
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = (+id) + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/ 	
/******/ 	function hotCheck(apply) {
/******/ 		if(hotStatus !== "idle") throw new Error("check() is only allowed in idle status");
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if(!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/ 	
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			for(var chunkId in installedChunks)
/******/ 			{ // eslint-disable-line no-lone-blocks
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if(hotStatus === "prepare" && hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/ 	
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		if(!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for(var moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if(!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if(!deferred) return;
/******/ 		if(hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve().then(function() {
/******/ 				return hotApply(hotApplyOnUpdate);
/******/ 			}).then(
/******/ 				function(result) {
/******/ 					deferred.resolve(result);
/******/ 				},
/******/ 				function(err) {
/******/ 					deferred.reject(err);
/******/ 				}
/******/ 			);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for(var id in hotUpdate) {
/******/ 				if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotApply(options) {
/******/ 		if(hotStatus !== "ready") throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/ 	
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/ 	
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/ 	
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while(queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if(!module || module.hot._selfAccepted)
/******/ 					continue;
/******/ 				if(module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if(module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for(var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if(!parent) continue;
/******/ 					if(parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if(outdatedModules.indexOf(parentId) >= 0) continue;
/******/ 					if(parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if(!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/ 	
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/ 	
/******/ 		function addAllToSet(a, b) {
/******/ 			for(var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if(a.indexOf(item) < 0)
/******/ 					a.push(item);
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/ 	
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn("[HMR] unexpected require(" + result.moduleId + ") to disposed module");
/******/ 		};
/******/ 	
/******/ 		for(var id in hotUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				var result;
/******/ 				if(hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if(result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch(result.type) {
/******/ 					case "self-declined":
/******/ 						if(options.onDeclined)
/******/ 							options.onDeclined(result);
/******/ 						if(!options.ignoreDeclined)
/******/ 							abortError = new Error("Aborted because of self decline: " + result.moduleId + chainInfo);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if(options.onDeclined)
/******/ 							options.onDeclined(result);
/******/ 						if(!options.ignoreDeclined)
/******/ 							abortError = new Error("Aborted because of declined dependency: " + result.moduleId + " in " + result.parentId + chainInfo);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if(options.onUnaccepted)
/******/ 							options.onUnaccepted(result);
/******/ 						if(!options.ignoreUnaccepted)
/******/ 							abortError = new Error("Aborted because " + moduleId + " is not accepted" + chainInfo);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if(options.onAccepted)
/******/ 							options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if(options.onDisposed)
/******/ 							options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if(abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if(doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for(moduleId in result.outdatedDependencies) {
/******/ 						if(Object.prototype.hasOwnProperty.call(result.outdatedDependencies, moduleId)) {
/******/ 							if(!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(outdatedDependencies[moduleId], result.outdatedDependencies[moduleId]);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if(doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for(i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if(installedModules[moduleId] && installedModules[moduleId].hot._selfAccepted)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/ 	
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if(hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/ 	
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while(queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if(!module) continue;
/******/ 	
/******/ 			var data = {};
/******/ 	
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for(j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/ 	
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/ 	
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/ 	
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/ 	
/******/ 			// remove "parents" references from all children
/******/ 			for(j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if(!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if(idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for(moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				module = installedModules[moduleId];
/******/ 				if(module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for(j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if(idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/ 	
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/ 	
/******/ 		// insert new code
/******/ 		for(moduleId in appliedUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for(moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				module = installedModules[moduleId];
/******/ 				if(module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for(i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if(cb) {
/******/ 							if(callbacks.indexOf(cb) >= 0) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for(i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch(err) {
/******/ 							if(options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if(!options.ignoreErrored) {
/******/ 								if(!error)
/******/ 									error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Load self accepted modules
/******/ 		for(i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch(err) {
/******/ 				if(typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch(err2) {
/******/ 						if(options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								orginalError: err, // TODO remove in webpack 4
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if(!options.ignoreErrored) {
/******/ 							if(!error)
/******/ 								error = err2;
/******/ 						}
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if(options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if(!options.ignoreErrored) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if(error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/ 	
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// objects to store loaded and loading chunks
/******/ 	var installedChunks = {
/******/ 		4: 0
/******/ 	};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var installedChunkData = installedChunks[chunkId];
/******/ 		if(installedChunkData === 0) {
/******/ 			return new Promise(function(resolve) { resolve(); });
/******/ 		}
/******/
/******/ 		// a Promise means "currently loading".
/******/ 		if(installedChunkData) {
/******/ 			return installedChunkData[2];
/******/ 		}
/******/
/******/ 		// setup Promise in chunk cache
/******/ 		var promise = new Promise(function(resolve, reject) {
/******/ 			installedChunkData = installedChunks[chunkId] = [resolve, reject];
/******/ 		});
/******/ 		installedChunkData[2] = promise;
/******/
/******/ 		// start chunk loading
/******/ 		var head = document.getElementsByTagName('head')[0];
/******/ 		var script = document.createElement('script');
/******/ 		script.type = 'text/javascript';
/******/ 		script.charset = 'utf-8';
/******/ 		script.async = true;
/******/ 		script.timeout = 120000;
/******/
/******/ 		if (__webpack_require__.nc) {
/******/ 			script.setAttribute("nonce", __webpack_require__.nc);
/******/ 		}
/******/ 		script.src = __webpack_require__.p + "" + chunkId + ".bundle.js";
/******/ 		var timeout = setTimeout(onScriptComplete, 120000);
/******/ 		script.onerror = script.onload = onScriptComplete;
/******/ 		function onScriptComplete() {
/******/ 			// avoid mem leaks in IE.
/******/ 			script.onerror = script.onload = null;
/******/ 			clearTimeout(timeout);
/******/ 			var chunk = installedChunks[chunkId];
/******/ 			if(chunk !== 0) {
/******/ 				if(chunk) {
/******/ 					chunk[1](new Error('Loading chunk ' + chunkId + ' failed.'));
/******/ 				}
/******/ 				installedChunks[chunkId] = undefined;
/******/ 			}
/******/ 		};
/******/ 		head.appendChild(script);
/******/
/******/ 		return promise;
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ProviderRegistry_1 = __webpack_require__(37);
function Inject(token) {
    return function (target, propertyKey, index) {
        if (index === void 0) {
            target[propertyKey] = ProviderRegistry_1.providerRegistry.get(token);
        }
        else {
            var paramtypes = Reflect.getMetadata('design:paramtypes', target) || [];
            paramtypes[index] = token;
            Reflect.defineMetadata('design:paramtypes', paramtypes, target);
        }
    };
}
exports.Inject = Inject;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Pool_1 = __webpack_require__(52);
var Vector = (function () {
    function Vector(x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        this.x = x;
        this.y = y;
        this._canRecycle = false;
    }
    Vector.Cross = function (v1, v2) {
        if (v1 instanceof Vector) {
            if (v2 instanceof Vector) {
                return new Vector().copy(v1).cross(v2);
            }
            else {
                return new Vector().copy(v1).cross(v2);
            }
        }
        else {
            if (v2 instanceof Vector) {
                return new Vector(-v1 * v2.y, v1 * v2.x);
            }
        }
        return;
    };
    Vector.Get = function (x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        return this.pool.get().setTo(x, y);
    };
    Vector.Put = function (vector) { this.pool.put(vector); };
    Object.defineProperty(Vector.prototype, "canRecycle", {
        get: function () { return this._canRecycle; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector.prototype, "isZero", {
        get: function () {
            return Math.abs(this.x) < 1e-6 &&
                Math.abs(this.y) < 1e-6;
        },
        enumerable: true,
        configurable: true
    });
    Vector.prototype.setTo = function (x, y) {
        if (y === void 0) { y = x; }
        this.x = x;
        this.y = y;
        return this;
    };
    Vector.prototype.add = function (otherOrX, y) {
        if (otherOrX instanceof Vector) {
            this.x += otherOrX.x;
            this.y += otherOrX.y;
        }
        else if (y !== void 0) {
            this.x += otherOrX;
            this.y += y;
        }
        else {
            this.x += otherOrX;
            this.y += otherOrX;
        }
        return this;
    };
    Vector.prototype.subtract = function (otherOrX, y) {
        if (otherOrX instanceof Vector) {
            this.x -= otherOrX.x;
            this.y -= otherOrX.y;
        }
        else if (y !== void 0) {
            this.x -= otherOrX;
            this.y -= y;
        }
        else {
            this.x -= otherOrX;
            this.y -= otherOrX;
        }
        return this;
    };
    Vector.prototype.multiply = function (otherOrX, y) {
        if (otherOrX instanceof Vector) {
            this.x *= otherOrX.x;
            this.y *= otherOrX.y;
        }
        else if (y !== void 0) {
            this.x *= otherOrX;
            this.y *= y;
        }
        else {
            this.x *= otherOrX;
            this.y *= otherOrX;
        }
        return this;
    };
    Vector.prototype.dot = function (other) {
        return this.x * other.x
            + this.y * other.y;
    };
    Vector.prototype.cross = function (value) {
        if (value instanceof Vector) {
            return this.x * value.y - this.y * value.x;
        }
        else {
            return new Vector(this.y * value, -this.x * value);
        }
    };
    Vector.prototype.magnitude = function () {
        return Math.sqrt(this.squareMagnitude());
    };
    Vector.prototype.squareMagnitude = function () {
        return Math.pow(this.x, 2)
            + Math.pow(this.y, 2);
    };
    Vector.prototype.distanceTo = function (other) {
        return Math.sqrt(this.squareDistance(other));
    };
    Vector.prototype.squareDistance = function (other) {
        return Math.pow(this.x - other.x, 2)
            + Math.pow(this.y - other.y, 2);
    };
    Vector.prototype.normalize = function () {
        var magnitude = this.magnitude();
        return magnitude > 0 ? this.multiply(1 / magnitude) : this.setTo(0, 0);
    };
    Vector.prototype.normal = function () {
        var normal = new Vector(this.y, -this.x);
        normal.normalize();
        return normal;
    };
    Vector.prototype.translate = function (vector) {
        return this.subtract(vector);
    };
    Vector.prototype.reset = function () {
        return this.setTo(0, 0);
    };
    Vector.prototype.rotate = function (radian) {
        var cos = Math.cos(radian);
        var sin = Math.sin(radian);
        var x = cos * this.x - sin * this.y;
        var y = sin * this.x + cos * this.y;
        this.x = x;
        this.y = y;
        return this;
    };
    Vector.prototype.equalTo = function (other, tolerance) {
        if (tolerance === void 0) { tolerance = 1e-6; }
        return Math.abs(this.x - other.x) <= tolerance
            && Math.abs(this.y - other.y) <= tolerance;
    };
    Vector.prototype.greaterThan = function (other) {
        return this.x > other.x
            && this.y > other.y;
    };
    Vector.prototype.greaterThanEqual = function (other) {
        return this.x >= other.x
            && this.y >= other.y;
    };
    Vector.prototype.lessThan = function (other) {
        return this.x < other.x
            && this.y < other.y;
    };
    Vector.prototype.lessThanEqual = function (other) {
        return this.x <= other.x
            && this.y <= other.y;
    };
    Vector.prototype.clone = function () {
        return new Vector(this.x, this.y);
    };
    Vector.prototype.copy = function (other) {
        return this.setTo(other.x, other.y);
    };
    Vector.prototype.destroy = function () {
        this._canRecycle = true;
    };
    Vector.prototype.toString = function () {
        return "Vector (" + this.x + "," + this.y + ")";
    };
    Vector.Zero = new Vector();
    Vector.Right = new Vector(1, 0);
    Vector.Left = new Vector(-1, 0);
    Vector.Up = new Vector(0, 1);
    Vector.Down = new Vector(0, -1);
    Vector.pool = new Pool_1.Pool(Vector);
    return Vector;
}());
exports.Vector = Vector;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ProviderRegistry_1 = __webpack_require__(37);
function Service(token) {
    return function (target) {
        ProviderRegistry_1.providerRegistry.provide({ token: token || target, useClass: target });
    };
}
exports.Service = Service;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var root_1 = __webpack_require__(18);
var toSubscriber_1 = __webpack_require__(72);
var observable_1 = __webpack_require__(49);
/**
 * A representation of any set of values over any amount of time. This is the most basic building block
 * of RxJS.
 *
 * @class Observable<T>
 */
var Observable = (function () {
    /**
     * @constructor
     * @param {Function} subscribe the function that is called when the Observable is
     * initially subscribed to. This function is given a Subscriber, to which new values
     * can be `next`ed, or an `error` method can be called to raise an error, or
     * `complete` can be called to notify of a successful completion.
     */
    function Observable(subscribe) {
        this._isScalar = false;
        if (subscribe) {
            this._subscribe = subscribe;
        }
    }
    /**
     * Creates a new Observable, with this Observable as the source, and the passed
     * operator defined as the new observable's operator.
     * @method lift
     * @param {Operator} operator the operator defining the operation to take on the observable
     * @return {Observable} a new observable with the Operator applied
     */
    Observable.prototype.lift = function (operator) {
        var observable = new Observable();
        observable.source = this;
        observable.operator = operator;
        return observable;
    };
    /**
     * Invokes an execution of an Observable and registers Observer handlers for notifications it will emit.
     *
     * <span class="informal">Use it when you have all these Observables, but still nothing is happening.</span>
     *
     * `subscribe` is not a regular operator, but a method that calls Observable's internal `subscribe` function. It
     * might be for example a function that you passed to a {@link create} static factory, but most of the time it is
     * a library implementation, which defines what and when will be emitted by an Observable. This means that calling
     * `subscribe` is actually the moment when Observable starts its work, not when it is created, as it is often
     * thought.
     *
     * Apart from starting the execution of an Observable, this method allows you to listen for values
     * that an Observable emits, as well as for when it completes or errors. You can achieve this in two
     * following ways.
     *
     * The first way is creating an object that implements {@link Observer} interface. It should have methods
     * defined by that interface, but note that it should be just a regular JavaScript object, which you can create
     * yourself in any way you want (ES6 class, classic function constructor, object literal etc.). In particular do
     * not attempt to use any RxJS implementation details to create Observers - you don't need them. Remember also
     * that your object does not have to implement all methods. If you find yourself creating a method that doesn't
     * do anything, you can simply omit it. Note however, that if `error` method is not provided, all errors will
     * be left uncaught.
     *
     * The second way is to give up on Observer object altogether and simply provide callback functions in place of its methods.
     * This means you can provide three functions as arguments to `subscribe`, where first function is equivalent
     * of a `next` method, second of an `error` method and third of a `complete` method. Just as in case of Observer,
     * if you do not need to listen for something, you can omit a function, preferably by passing `undefined` or `null`,
     * since `subscribe` recognizes these functions by where they were placed in function call. When it comes
     * to `error` function, just as before, if not provided, errors emitted by an Observable will be thrown.
     *
     * Whatever style of calling `subscribe` you use, in both cases it returns a Subscription object.
     * This object allows you to call `unsubscribe` on it, which in turn will stop work that an Observable does and will clean
     * up all resources that an Observable used. Note that cancelling a subscription will not call `complete` callback
     * provided to `subscribe` function, which is reserved for a regular completion signal that comes from an Observable.
     *
     * Remember that callbacks provided to `subscribe` are not guaranteed to be called asynchronously.
     * It is an Observable itself that decides when these functions will be called. For example {@link of}
     * by default emits all its values synchronously. Always check documentation for how given Observable
     * will behave when subscribed and if its default behavior can be modified with a {@link Scheduler}.
     *
     * @example <caption>Subscribe with an Observer</caption>
     * const sumObserver = {
     *   sum: 0,
     *   next(value) {
     *     console.log('Adding: ' + value);
     *     this.sum = this.sum + value;
     *   },
     *   error() { // We actually could just remove this method,
     *   },        // since we do not really care about errors right now.
     *   complete() {
     *     console.log('Sum equals: ' + this.sum);
     *   }
     * };
     *
     * Rx.Observable.of(1, 2, 3) // Synchronously emits 1, 2, 3 and then completes.
     * .subscribe(sumObserver);
     *
     * // Logs:
     * // "Adding: 1"
     * // "Adding: 2"
     * // "Adding: 3"
     * // "Sum equals: 6"
     *
     *
     * @example <caption>Subscribe with functions</caption>
     * let sum = 0;
     *
     * Rx.Observable.of(1, 2, 3)
     * .subscribe(
     *   function(value) {
     *     console.log('Adding: ' + value);
     *     sum = sum + value;
     *   },
     *   undefined,
     *   function() {
     *     console.log('Sum equals: ' + sum);
     *   }
     * );
     *
     * // Logs:
     * // "Adding: 1"
     * // "Adding: 2"
     * // "Adding: 3"
     * // "Sum equals: 6"
     *
     *
     * @example <caption>Cancel a subscription</caption>
     * const subscription = Rx.Observable.interval(1000).subscribe(
     *   num => console.log(num),
     *   undefined,
     *   () => console.log('completed!') // Will not be called, even
     * );                                // when cancelling subscription
     *
     *
     * setTimeout(() => {
     *   subscription.unsubscribe();
     *   console.log('unsubscribed!');
     * }, 2500);
     *
     * // Logs:
     * // 0 after 1s
     * // 1 after 2s
     * // "unsubscribed!" after 2.5s
     *
     *
     * @param {Observer|Function} observerOrNext (optional) Either an observer with methods to be called,
     *  or the first of three possible handlers, which is the handler for each value emitted from the subscribed
     *  Observable.
     * @param {Function} error (optional) A handler for a terminal event resulting from an error. If no error handler is provided,
     *  the error will be thrown as unhandled.
     * @param {Function} complete (optional) A handler for a terminal event resulting from successful completion.
     * @return {ISubscription} a subscription reference to the registered handlers
     * @method subscribe
     */
    Observable.prototype.subscribe = function (observerOrNext, error, complete) {
        var operator = this.operator;
        var sink = toSubscriber_1.toSubscriber(observerOrNext, error, complete);
        if (operator) {
            operator.call(sink, this.source);
        }
        else {
            sink.add(this.source ? this._subscribe(sink) : this._trySubscribe(sink));
        }
        if (sink.syncErrorThrowable) {
            sink.syncErrorThrowable = false;
            if (sink.syncErrorThrown) {
                throw sink.syncErrorValue;
            }
        }
        return sink;
    };
    Observable.prototype._trySubscribe = function (sink) {
        try {
            return this._subscribe(sink);
        }
        catch (err) {
            sink.syncErrorThrown = true;
            sink.syncErrorValue = err;
            sink.error(err);
        }
    };
    /**
     * @method forEach
     * @param {Function} next a handler for each value emitted by the observable
     * @param {PromiseConstructor} [PromiseCtor] a constructor function used to instantiate the Promise
     * @return {Promise} a promise that either resolves on observable completion or
     *  rejects with the handled error
     */
    Observable.prototype.forEach = function (next, PromiseCtor) {
        var _this = this;
        if (!PromiseCtor) {
            if (root_1.root.Rx && root_1.root.Rx.config && root_1.root.Rx.config.Promise) {
                PromiseCtor = root_1.root.Rx.config.Promise;
            }
            else if (root_1.root.Promise) {
                PromiseCtor = root_1.root.Promise;
            }
        }
        if (!PromiseCtor) {
            throw new Error('no Promise impl found');
        }
        return new PromiseCtor(function (resolve, reject) {
            // Must be declared in a separate statement to avoid a RefernceError when
            // accessing subscription below in the closure due to Temporal Dead Zone.
            var subscription;
            subscription = _this.subscribe(function (value) {
                if (subscription) {
                    // if there is a subscription, then we can surmise
                    // the next handling is asynchronous. Any errors thrown
                    // need to be rejected explicitly and unsubscribe must be
                    // called manually
                    try {
                        next(value);
                    }
                    catch (err) {
                        reject(err);
                        subscription.unsubscribe();
                    }
                }
                else {
                    // if there is NO subscription, then we're getting a nexted
                    // value synchronously during subscription. We can just call it.
                    // If it errors, Observable's `subscribe` will ensure the
                    // unsubscription logic is called, then synchronously rethrow the error.
                    // After that, Promise will trap the error and send it
                    // down the rejection path.
                    next(value);
                }
            }, reject, resolve);
        });
    };
    Observable.prototype._subscribe = function (subscriber) {
        return this.source.subscribe(subscriber);
    };
    /**
     * An interop point defined by the es7-observable spec https://github.com/zenparsing/es-observable
     * @method Symbol.observable
     * @return {Observable} this instance of the observable
     */
    Observable.prototype[observable_1.observable] = function () {
        return this;
    };
    // HACK: Since TypeScript inherits static properties too, we have to
    // fight against TypeScript here so Subject can have a different static create signature
    /**
     * Creates a new cold Observable by calling the Observable constructor
     * @static true
     * @owner Observable
     * @method create
     * @param {Function} subscribe? the subscriber function to be passed to the Observable constructor
     * @return {Observable} a new cold observable
     */
    Observable.create = function (subscribe) {
        return new Observable(subscribe);
    };
    return Observable;
}());
exports.Observable = Observable;
//# sourceMappingURL=Observable.js.map

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.BrowserDelegate = Symbol('BrowserDelegate');


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function removeFromArray(array, item) {
    var index = array.indexOf(item);
    if (index === -1) {
        return false;
    }
    array.splice(index, 1);
    return true;
}
exports.removeFromArray = removeFromArray;
function addToArray(array, item) {
    var index = array.indexOf(item);
    if (index !== -1) {
        return false;
    }
    array.push(item);
    return true;
}
exports.addToArray = addToArray;
function includeInArray(array, item) {
    return array.includes(item);
}
exports.includeInArray = includeInArray;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var BaseObject_1 = __webpack_require__(41);
var Type_1 = __webpack_require__(14);
var TransformComponent_1 = __webpack_require__(16);
var ArrayUtility_1 = __webpack_require__(5);
var Tree_1 = __webpack_require__(59);
var runtime_1 = __webpack_require__(12);
var GameObjectInitializer_1 = __webpack_require__(28);
var Class_1 = __webpack_require__(9);
var Inject_1 = __webpack_require__(0);
var GameObject = (function (_super) {
    __extends(GameObject, _super);
    function GameObject(gameObjectInitializer) {
        var _this = _super.call(this) || this;
        _this.layer = Type_1.BuiltInLayer.Default;
        _this.node = new Tree_1.Tree(_this);
        _this.components = [];
        _this.tags = [];
        _this.transform = _this.addComponent(TransformComponent_1.TransformComponent);
        gameObjectInitializer.push(_this);
        return _this;
    }
    GameObject_1 = GameObject;
    GameObject.FindWithTag = function (tag) {
        return this.GetBucketByTag(tag);
    };
    GameObject.AddTaggedGameObject = function (gameObject, specificTag) {
        var _this = this;
        if (specificTag) {
            var bucket = this.GetBucketByTag(specificTag);
            ArrayUtility_1.addToArray(bucket, gameObject);
        }
        else {
            gameObject.tags.forEach(function (tag) {
                var bucket = _this.GetBucketByTag(tag);
                ArrayUtility_1.addToArray(bucket, gameObject);
            });
        }
    };
    GameObject.RemoveTaggedGameObject = function (gameObject, specificTag) {
        var _this = this;
        if (specificTag) {
            var bucket = this.GetBucketByTag(specificTag);
            ArrayUtility_1.removeFromArray(bucket, gameObject);
        }
        else {
            gameObject.tags.forEach(function (tag) {
                var bucket = _this.GetBucketByTag(tag);
                ArrayUtility_1.removeFromArray(bucket, gameObject);
            });
        }
    };
    GameObject.GetBucketByTag = function (tag) {
        var bucket = this.TaggedGameObjects.get(tag);
        if (!bucket) {
            bucket = [];
            this.TaggedGameObjects.set(tag, bucket);
        }
        return bucket;
    };
    Object.defineProperty(GameObject.prototype, "parent", {
        get: function () {
            return this.node.parent ? this.node.parent.data : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameObject.prototype, "children", {
        get: function () {
            return this.node.children.map(function (node) { return node.data; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameObject.prototype, "isActive", {
        get: function () {
            if (this.parent && !this.parent.isActive) {
                return false;
            }
            return this._isActive;
        },
        enumerable: true,
        configurable: true
    });
    GameObject.prototype.hasTag = function (tag) {
        return ArrayUtility_1.includeInArray(this.tags, tag);
    };
    GameObject.prototype.addTag = function (tag) {
        if (ArrayUtility_1.addToArray(this.tags, tag)) {
            GameObject_1.AddTaggedGameObject(this, tag);
        }
    };
    GameObject.prototype.removeTag = function (tag) {
        if (ArrayUtility_1.removeFromArray(this.tags, tag)) {
            GameObject_1.RemoveTaggedGameObject(this, tag);
        }
    };
    GameObject.prototype.addComponent = function (ComponentType) {
        var _this = this;
        var isUnique = Reflect.getMetadata('component:unique', ComponentType) || false;
        if (isUnique && this.getComponent(ComponentType)) {
            throw new Error("Unique component " + ComponentType);
        }
        var RequireComponentTypes = Reflect.getMetadata('component:require', ComponentType) || [];
        RequireComponentTypes.forEach(function (RequireComponentType) {
            if (!_this.getComponent(RequireComponentType)) {
                throw new Error(ComponentType + " require component " + RequireComponentType);
            }
        });
        var component = runtime_1.instantiate(ComponentType, this);
        if (this._hasStarted) {
            component.start();
        }
        this.components.push(component);
        return component;
    };
    GameObject.prototype.removeComponent = function (component) {
        if (!ArrayUtility_1.removeFromArray(this.components, component)) {
            throw new Error("Not found components, " + component);
        }
        component.destroy();
    };
    GameObject.prototype.getComponent = function (componentType) {
        return this.components.find(function (component) { return component instanceof componentType; });
    };
    GameObject.prototype.getComponents = function (componentType) {
        return this.components.filter(function (component) { return component instanceof componentType; });
    };
    GameObject.prototype.addChild = function (child) {
        if (this.node.hasChild(child.node)) {
            throw new Error("Repeatly add child, " + child);
        }
        if (child.node.parent) {
            child.node.parent.remove(child.node);
        }
        this.node.add(child.node);
        child.transform.localPosition.copy(child.transform.position);
    };
    GameObject.prototype.removeChild = function (child) {
        if (this.node.hasChild(child.node)) {
            throw new Error("Not found child, " + child);
        }
        this.node.remove(child.node);
    };
    GameObject.prototype.activate = function () {
        _super.prototype.activate.call(this);
        this.node.show();
    };
    GameObject.prototype.deactivate = function () {
        _super.prototype.deactivate.call(this);
        this.node.hide();
    };
    GameObject.prototype.start = function () {
        _super.prototype.start.call(this);
        this.components.forEach(function (component) { return component.start(); });
    };
    GameObject.prototype.fixedUpdate = function (alpha) {
        if (alpha === void 0) { alpha = 1; }
        this.components.forEach(function (component) { return component.fixedUpdate(alpha); });
    };
    GameObject.prototype.update = function () {
        this.components.forEach(function (component) { return component.update(); });
    };
    GameObject.prototype.lateUpdate = function () {
        this.components.forEach(function (component) { return component.lateUpdate(); });
    };
    GameObject.prototype.preRender = function () {
        this.components.forEach(function (component) { return component.preRender(); });
    };
    GameObject.prototype.postRender = function () {
        this.components.forEach(function (component) { return component.postRender(); });
    };
    GameObject.prototype.reset = function () {
        _super.prototype.reset.call(this);
        this.layer = Type_1.BuiltInLayer.Default;
        this.components = [];
        this.tags = [];
        this._hasStarted = false;
        this.components.forEach(function (component) { return component.reset(); });
        this.children.forEach(function (child) { return child.reset(); });
    };
    GameObject.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        GameObject_1.RemoveTaggedGameObject(this);
        this.components.forEach(function (component) { return component.destroy(); });
        this.children.forEach(function (child) { return child.destroy(); });
        if (this.node.parent) {
            this.node.parent.remove(this.node);
        }
    };
    GameObject.prototype.toString = function () {
        return "GameObject(" + this.id + ")";
    };
    GameObject.prototype.initialize = function () {
        this.start();
    };
    GameObject.TaggedGameObjects = new Map();
    GameObject = GameObject_1 = __decorate([
        Class_1.Class(),
        __param(0, Inject_1.Inject(GameObjectInitializer_1.GameObjectInitializer)),
        __metadata("design:paramtypes", [Object])
    ], GameObject);
    return GameObject;
    var GameObject_1;
}(BaseObject_1.BaseObject));
exports.GameObject = GameObject;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Color = (function () {
    function Color(red, green, blue, alpha) {
        if (red === void 0) { red = 255; }
        if (green === void 0) { green = 255; }
        if (blue === void 0) { blue = 255; }
        if (alpha === void 0) { alpha = 1; }
        this.red = red;
        this.green = green;
        this.blue = blue;
        this.alpha = alpha;
        this.setAlpha(alpha);
    }
    Color.Parse = function (colorString) {
        colorString = colorString.replace(/\s/g, '');
        var hexRegex = /#[0-9a-fA-F]{3,6}/;
        var rgbRegex = /rgb.?([0-9.]+),([0-9.]+),([0-9.]+)/;
        var rgbaRegex = /rgba.?([0-9.]+),([0-9.]+),([0-9.]+),([0-9.]+)/;
        if (hexRegex.test(colorString)) {
            return Color.CreateByHexRgb(colorString);
        }
        if (rgbaRegex.test(colorString)) {
            var match = colorString.match(rgbaRegex);
            if (match !== null) {
                return new Color(parseInt(match[1], 10), parseInt(match[2], 10), parseInt(match[3], 10), parseFloat(match[4]));
            }
        }
        if (rgbRegex.test(colorString)) {
            var match = colorString.match(rgbRegex);
            if (match !== null) {
                return new Color(parseInt(match[1], 10), parseInt(match[2], 10), parseInt(match[3], 10));
            }
        }
        throw new TypeError("unknown color " + colorString);
    };
    Color.CreateByHexRgb = function (hexColorString) {
        hexColorString = hexColorString.replace(' ', '').replace('#', '');
        if (hexColorString.length === 3) {
            return new Color(parseInt(hexColorString[0] + hexColorString[0], 16), parseInt(hexColorString[1] + hexColorString[1], 16), parseInt(hexColorString[2] + hexColorString[2], 16));
        }
        else {
            for (var i = 0; i < (6 - hexColorString.length); i++) {
                hexColorString += 'f';
            }
            return new Color(parseInt(hexColorString.slice(0, 2), 16), parseInt(hexColorString.slice(2, 4), 16), parseInt(hexColorString.slice(4, 6), 16));
        }
    };
    Color.prototype.toString = function () {
        return "rgba(" + this.red + "," + this.green + "," + this.blue + "," + this.alpha + ")";
    };
    Color.prototype.toHexString = function () {
        var r = ("0" + this.red.toString(16)).slice(-2);
        var g = ("0" + this.green.toString(16)).slice(-2);
        var b = ("0" + this.blue.toString(16)).slice(-2);
        var a = ("0" + this.alpha.toString(16)).slice(-2);
        return "#" + r + g + b;
    };
    Color.prototype.setAlpha = function (alpha) {
        if (alpha <= 1) {
            alpha = Math.floor(alpha * 255);
        }
        this.alpha = alpha;
    };
    Color.White = new Color(255, 255, 255);
    Color.Black = new Color(0, 0, 0);
    Color.Red = new Color(255, 0, 0);
    Color.Green = new Color(0, 255, 0);
    Color.Blue = new Color(0, 0, 255);
    Color.Yellow = new Color(255, 255, 0);
    Color.Cyan = new Color(0, 255, 255);
    Color.Purple = new Color(255, 0, 255);
    return Color;
}());
exports.Color = Color;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var Subject_1 = __webpack_require__(38);
var Component_1 = __webpack_require__(10);
var GameObject_1 = __webpack_require__(6);
var TransformComponent_1 = __webpack_require__(16);
var Bounds_1 = __webpack_require__(29);
var RequireComponent_1 = __webpack_require__(30);
var BrowserDelegate_1 = __webpack_require__(4);
var Vector_1 = __webpack_require__(1);
var Inject_1 = __webpack_require__(0);
var RendererComponent = (function (_super) {
    __extends(RendererComponent, _super);
    function RendererComponent(host, browserDelegate) {
        var _this = _super.call(this, host) || this;
        _this.bounds = new Bounds_1.Bounds();
        _this._onBecameVisible$ = new Subject_1.Subject();
        _this._onBecameInvisible$ = new Subject_1.Subject();
        _this.canvas = browserDelegate.createCanvas();
        _this.ctx = browserDelegate.getContext(_this.canvas);
        return _this;
    }
    Object.defineProperty(RendererComponent.prototype, "onBecameVisible$", {
        get: function () { return this._onBecameVisible$.asObservable(); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RendererComponent.prototype, "onBecameInvisible$", {
        get: function () { return this._onBecameInvisible$.asObservable(); },
        enumerable: true,
        configurable: true
    });
    RendererComponent.prototype.start = function () {
        _super.prototype.start.call(this);
        this.transform = this.getComponent(TransformComponent_1.TransformComponent);
    };
    RendererComponent.prototype.preRender = function () {
        _super.prototype.preRender.call(this);
        this.calculateBounds();
    };
    RendererComponent.prototype.render = function () { return; };
    RendererComponent.prototype.onBecameVisible = function (camera) {
        this._onBecameVisible$.next(camera);
    };
    RendererComponent.prototype.onBecameInvisible = function (camera) {
        this._onBecameInvisible$.next(camera);
    };
    RendererComponent.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        this._onBecameVisible$.complete();
        this._onBecameInvisible$.complete();
    };
    RendererComponent.prototype.calculateBounds = function () {
        var _this = this;
        var minX = Number.MAX_VALUE;
        var minY = Number.MAX_VALUE;
        var maxX = -Number.MAX_VALUE;
        var maxY = -Number.MAX_VALUE;
        var e = Vector_1.Vector.Get(this.canvas.width * 0.5, this.canvas.height * 0.5);
        var c = this.transform.position;
        var s = this.transform.scale;
        Vector_1.Vector.Put(e);
        [
            Vector_1.Vector.Get(e.x, e.y),
            Vector_1.Vector.Get(-e.x, e.y),
            Vector_1.Vector.Get(-e.x, -e.y),
            Vector_1.Vector.Get(e.x, -e.y)
        ].forEach(function (p) {
            p.multiply(s.x, s.y);
            p.rotate(-_this.transform.rotation);
            p.add(c);
            if (p.x < minX) {
                minX = p.x;
            }
            if (p.x > maxX) {
                maxX = p.x;
            }
            if (p.y < minY) {
                minY = p.y;
            }
            if (p.y > maxY) {
                maxY = p.y;
            }
            Vector_1.Vector.Put(p);
        });
        this.bounds.reset(minX, minY, maxX, maxY);
    };
    RendererComponent = __decorate([
        RequireComponent_1.RequireComponent([TransformComponent_1.TransformComponent]),
        __param(1, Inject_1.Inject(BrowserDelegate_1.BrowserDelegate)),
        __metadata("design:paramtypes", [GameObject_1.GameObject, Object])
    ], RendererComponent);
    return RendererComponent;
}(Component_1.Component));
exports.RendererComponent = RendererComponent;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function Class(token) {
    return function (target) {
        return target;
    };
}
exports.Class = Class;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var BaseObject_1 = __webpack_require__(41);
var Component = (function (_super) {
    __extends(Component, _super);
    function Component(host) {
        var _this = _super.call(this) || this;
        _this.host = host;
        return _this;
    }
    Component.prototype.addComponent = function (componentType) {
        return this.host.addComponent(componentType);
    };
    Component.prototype.removeComponent = function (component) {
        this.host.removeComponent(component);
    };
    Component.prototype.getComponent = function (componentType) {
        return this.host.getComponent(componentType);
    };
    Component.prototype.getComponents = function (componentType) {
        return this.host.getComponents(componentType);
    };
    Component.prototype.toString = function () {
        return "GameComponent(" + this.id + ")";
    };
    return Component;
}(BaseObject_1.BaseObject));
exports.Component = Component;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function UniqueComponent() {
    return function (ComponentType) {
        Reflect.defineMetadata('component:unique', true, ComponentType);
    };
}
exports.UniqueComponent = UniqueComponent;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var Engine_1 = __webpack_require__(21);
var ProviderRegistry_1 = __webpack_require__(37);
var engine;
var global = new Map();
function bootstrap() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            engine = ProviderRegistry_1.providerRegistry.get(Engine_1.Engine);
            return [2, engine.initialize()];
        });
    });
}
exports.bootstrap = bootstrap;
function provide(providers) {
    providers.forEach(function (provider) { return ProviderRegistry_1.providerRegistry.provide(provider); });
}
exports.provide = provide;
function instantiate(InstanceType) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    return ProviderRegistry_1.providerRegistry.instantiate.apply(ProviderRegistry_1.providerRegistry, [InstanceType].concat(args));
}
exports.instantiate = instantiate;
function getService(token) {
    return ProviderRegistry_1.providerRegistry.get(token);
}
exports.getService = getService;
function create(factory) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    return ProviderRegistry_1.providerRegistry.create.apply(ProviderRegistry_1.providerRegistry, [factory].concat(args));
}
exports.create = create;
function def(key, value) {
    if (value === void 0) { value = true; }
    global.set(key, value);
}
exports.def = def;
function ifdef(key, run) {
    if (global.has(key)) {
        run();
    }
}
exports.ifdef = ifdef;
function ifndef(key, run) {
    if (!global.has(key)) {
        run();
    }
}
exports.ifndef = ifndef;
exports.DEBUG = Symbol('DEBUG');
exports.DEBUG_RENDERER = Symbol('DEBUG_RENDERER');
exports.DEBUG_PHYSICS = Symbol('DEBUG_PHYSICS');


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var isFunction_1 = __webpack_require__(34);
var Subscription_1 = __webpack_require__(27);
var Observer_1 = __webpack_require__(48);
var rxSubscriber_1 = __webpack_require__(36);
/**
 * Implements the {@link Observer} interface and extends the
 * {@link Subscription} class. While the {@link Observer} is the public API for
 * consuming the values of an {@link Observable}, all Observers get converted to
 * a Subscriber, in order to provide Subscription-like capabilities such as
 * `unsubscribe`. Subscriber is a common type in RxJS, and crucial for
 * implementing operators, but it is rarely used as a public API.
 *
 * @class Subscriber<T>
 */
var Subscriber = (function (_super) {
    __extends(Subscriber, _super);
    /**
     * @param {Observer|function(value: T): void} [destinationOrNext] A partially
     * defined Observer or a `next` callback function.
     * @param {function(e: ?any): void} [error] The `error` callback of an
     * Observer.
     * @param {function(): void} [complete] The `complete` callback of an
     * Observer.
     */
    function Subscriber(destinationOrNext, error, complete) {
        _super.call(this);
        this.syncErrorValue = null;
        this.syncErrorThrown = false;
        this.syncErrorThrowable = false;
        this.isStopped = false;
        switch (arguments.length) {
            case 0:
                this.destination = Observer_1.empty;
                break;
            case 1:
                if (!destinationOrNext) {
                    this.destination = Observer_1.empty;
                    break;
                }
                if (typeof destinationOrNext === 'object') {
                    if (destinationOrNext instanceof Subscriber) {
                        this.destination = destinationOrNext;
                        this.destination.add(this);
                    }
                    else {
                        this.syncErrorThrowable = true;
                        this.destination = new SafeSubscriber(this, destinationOrNext);
                    }
                    break;
                }
            default:
                this.syncErrorThrowable = true;
                this.destination = new SafeSubscriber(this, destinationOrNext, error, complete);
                break;
        }
    }
    Subscriber.prototype[rxSubscriber_1.rxSubscriber] = function () { return this; };
    /**
     * A static factory for a Subscriber, given a (potentially partial) definition
     * of an Observer.
     * @param {function(x: ?T): void} [next] The `next` callback of an Observer.
     * @param {function(e: ?any): void} [error] The `error` callback of an
     * Observer.
     * @param {function(): void} [complete] The `complete` callback of an
     * Observer.
     * @return {Subscriber<T>} A Subscriber wrapping the (partially defined)
     * Observer represented by the given arguments.
     */
    Subscriber.create = function (next, error, complete) {
        var subscriber = new Subscriber(next, error, complete);
        subscriber.syncErrorThrowable = false;
        return subscriber;
    };
    /**
     * The {@link Observer} callback to receive notifications of type `next` from
     * the Observable, with a value. The Observable may call this method 0 or more
     * times.
     * @param {T} [value] The `next` value.
     * @return {void}
     */
    Subscriber.prototype.next = function (value) {
        if (!this.isStopped) {
            this._next(value);
        }
    };
    /**
     * The {@link Observer} callback to receive notifications of type `error` from
     * the Observable, with an attached {@link Error}. Notifies the Observer that
     * the Observable has experienced an error condition.
     * @param {any} [err] The `error` exception.
     * @return {void}
     */
    Subscriber.prototype.error = function (err) {
        if (!this.isStopped) {
            this.isStopped = true;
            this._error(err);
        }
    };
    /**
     * The {@link Observer} callback to receive a valueless notification of type
     * `complete` from the Observable. Notifies the Observer that the Observable
     * has finished sending push-based notifications.
     * @return {void}
     */
    Subscriber.prototype.complete = function () {
        if (!this.isStopped) {
            this.isStopped = true;
            this._complete();
        }
    };
    Subscriber.prototype.unsubscribe = function () {
        if (this.closed) {
            return;
        }
        this.isStopped = true;
        _super.prototype.unsubscribe.call(this);
    };
    Subscriber.prototype._next = function (value) {
        this.destination.next(value);
    };
    Subscriber.prototype._error = function (err) {
        this.destination.error(err);
        this.unsubscribe();
    };
    Subscriber.prototype._complete = function () {
        this.destination.complete();
        this.unsubscribe();
    };
    Subscriber.prototype._unsubscribeAndRecycle = function () {
        var _a = this, _parent = _a._parent, _parents = _a._parents;
        this._parent = null;
        this._parents = null;
        this.unsubscribe();
        this.closed = false;
        this.isStopped = false;
        this._parent = _parent;
        this._parents = _parents;
        return this;
    };
    return Subscriber;
}(Subscription_1.Subscription));
exports.Subscriber = Subscriber;
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var SafeSubscriber = (function (_super) {
    __extends(SafeSubscriber, _super);
    function SafeSubscriber(_parentSubscriber, observerOrNext, error, complete) {
        _super.call(this);
        this._parentSubscriber = _parentSubscriber;
        var next;
        var context = this;
        if (isFunction_1.isFunction(observerOrNext)) {
            next = observerOrNext;
        }
        else if (observerOrNext) {
            next = observerOrNext.next;
            error = observerOrNext.error;
            complete = observerOrNext.complete;
            if (observerOrNext !== Observer_1.empty) {
                context = Object.create(observerOrNext);
                if (isFunction_1.isFunction(context.unsubscribe)) {
                    this.add(context.unsubscribe.bind(context));
                }
                context.unsubscribe = this.unsubscribe.bind(this);
            }
        }
        this._context = context;
        this._next = next;
        this._error = error;
        this._complete = complete;
    }
    SafeSubscriber.prototype.next = function (value) {
        if (!this.isStopped && this._next) {
            var _parentSubscriber = this._parentSubscriber;
            if (!_parentSubscriber.syncErrorThrowable) {
                this.__tryOrUnsub(this._next, value);
            }
            else if (this.__tryOrSetError(_parentSubscriber, this._next, value)) {
                this.unsubscribe();
            }
        }
    };
    SafeSubscriber.prototype.error = function (err) {
        if (!this.isStopped) {
            var _parentSubscriber = this._parentSubscriber;
            if (this._error) {
                if (!_parentSubscriber.syncErrorThrowable) {
                    this.__tryOrUnsub(this._error, err);
                    this.unsubscribe();
                }
                else {
                    this.__tryOrSetError(_parentSubscriber, this._error, err);
                    this.unsubscribe();
                }
            }
            else if (!_parentSubscriber.syncErrorThrowable) {
                this.unsubscribe();
                throw err;
            }
            else {
                _parentSubscriber.syncErrorValue = err;
                _parentSubscriber.syncErrorThrown = true;
                this.unsubscribe();
            }
        }
    };
    SafeSubscriber.prototype.complete = function () {
        var _this = this;
        if (!this.isStopped) {
            var _parentSubscriber = this._parentSubscriber;
            if (this._complete) {
                var wrappedComplete = function () { return _this._complete.call(_this._context); };
                if (!_parentSubscriber.syncErrorThrowable) {
                    this.__tryOrUnsub(wrappedComplete);
                    this.unsubscribe();
                }
                else {
                    this.__tryOrSetError(_parentSubscriber, wrappedComplete);
                    this.unsubscribe();
                }
            }
            else {
                this.unsubscribe();
            }
        }
    };
    SafeSubscriber.prototype.__tryOrUnsub = function (fn, value) {
        try {
            fn.call(this._context, value);
        }
        catch (err) {
            this.unsubscribe();
            throw err;
        }
    };
    SafeSubscriber.prototype.__tryOrSetError = function (parent, fn, value) {
        try {
            fn.call(this._context, value);
        }
        catch (err) {
            parent.syncErrorValue = err;
            parent.syncErrorThrown = true;
            return true;
        }
        return false;
    };
    SafeSubscriber.prototype._unsubscribe = function () {
        var _parentSubscriber = this._parentSubscriber;
        this._context = null;
        this._parentSubscriber = null;
        _parentSubscriber.unsubscribe();
    };
    return SafeSubscriber;
}(Subscriber));
//# sourceMappingURL=Subscriber.js.map

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function getClass(instance) {
    return instance.constructor;
}
exports.getClass = getClass;
var BuiltInLayer;
(function (BuiltInLayer) {
    BuiltInLayer[BuiltInLayer["Background"] = 1] = "Background";
    BuiltInLayer[BuiltInLayer["Default"] = 2] = "Default";
    BuiltInLayer[BuiltInLayer["FX"] = 4] = "FX";
    BuiltInLayer[BuiltInLayer["UI"] = 64] = "UI";
})(BuiltInLayer = exports.BuiltInLayer || (exports.BuiltInLayer = {}));
exports.AllBuiltInLayer = BuiltInLayer.Background |
    BuiltInLayer.Default |
    BuiltInLayer.FX |
    BuiltInLayer.UI;
function forwardRef(get) {
    get.__forward_ref__ = get;
    return get;
}
exports.forwardRef = forwardRef;
function resolveForwardRef(ref) {
    if (typeof ref === 'function' && ref.hasOwnProperty('__forward_ref__') && ref.__forward_ref__ === ref) {
        return ref();
    }
    else {
        return ref;
    }
}
exports.resolveForwardRef = resolveForwardRef;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.SceneManager = Symbol('SceneManager');


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Component_1 = __webpack_require__(10);
var Vector_1 = __webpack_require__(1);
var UniqueComponent_1 = __webpack_require__(11);
var Matrix_1 = __webpack_require__(58);
var TransformComponent = (function (_super) {
    __extends(TransformComponent, _super);
    function TransformComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.position = Vector_1.Vector.Get();
        _this.localPosition = Vector_1.Vector.Get();
        _this.scale = Vector_1.Vector.Get(1, 1);
        _this.localScale = Vector_1.Vector.Get(1, 1);
        _this.rotation = 0;
        _this.localRotation = 0;
        _this.toWorldMatrix = new Matrix_1.Matrix();
        _this.toLocalMatrix = _this.toWorldMatrix.getInverse();
        return _this;
    }
    TransformComponent.prototype.fixedUpdate = function (alpha) {
        _super.prototype.fixedUpdate.call(this, alpha);
        if (this.host.parent) {
            var parentTransform = this.host.parent.transform;
            this.position.copy(parentTransform.position);
            this.position.add(this.localPosition);
            this.scale.copy(parentTransform.scale);
            this.scale.multiply(this.localScale);
            this.rotation = parentTransform.rotation + this.localRotation;
        }
        this.toWorldMatrix.reset();
        this.toWorldMatrix.setTranslation(this.position);
        this.toWorldMatrix.setRotatation(this.rotation);
        this.toWorldMatrix.setScaling(this.scale);
        this.toLocalMatrix.invertFrom(this.toWorldMatrix);
    };
    TransformComponent.prototype.reset = function () {
        _super.prototype.reset.call(this);
        this.position.reset();
        this.localPosition.reset();
        this.scale.setTo(1, 1);
        this.localScale.setTo(1, 1);
        this.rotation = 0;
    };
    TransformComponent.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        Vector_1.Vector.Put(this.position);
        Vector_1.Vector.Put(this.localPosition);
        Vector_1.Vector.Put(this.scale);
        Vector_1.Vector.Put(this.localScale);
        delete this.position;
        delete this.scale;
        delete this.localScale;
    };
    TransformComponent = __decorate([
        UniqueComponent_1.UniqueComponent()
    ], TransformComponent);
    return TransformComponent;
}(Component_1.Component));
exports.TransformComponent = TransformComponent;


/***/ }),
/* 17 */,
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {
// CommonJS / Node have global context exposed as "global" variable.
// We don't want to include the whole node.d.ts this this compilation unit so we'll just fake
// the global "global" var for now.
var __window = typeof window !== 'undefined' && window;
var __self = typeof self !== 'undefined' && typeof WorkerGlobalScope !== 'undefined' &&
    self instanceof WorkerGlobalScope && self;
var __global = typeof global !== 'undefined' && global;
var _root = __window || __global || __self;
exports.root = _root;
// Workaround Closure Compiler restriction: The body of a goog.module cannot use throw.
// This is needed when used with angular/tsickle which inserts a goog.module statement.
// Wrap in IIFE
(function () {
    if (!_root) {
        throw new Error('RxJS could not find any global context (window, self, global)');
    }
})();
//# sourceMappingURL=root.js.map
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(45)))

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Screen = Symbol('Screen');


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Time = Symbol('Time');


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Engine = Symbol('Engine');


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var Resource_1 = __webpack_require__(62);
var DOM_1 = __webpack_require__(56);
var BrowserDelegate_1 = __webpack_require__(4);
var Inject_1 = __webpack_require__(0);
var Texture = (function (_super) {
    __extends(Texture, _super);
    function Texture(path, imageData) {
        var _this = _super.call(this) || this;
        _this.path = path;
        _this.canvas = _this.browser.document.createElement('canvas');
        _this.ctx = _this.canvas.getContext('2d');
        _this.isDirty = false;
        if (imageData) {
            _this.canvas.width = imageData.width;
            _this.canvas.height = imageData.height;
            _this.setImageData(imageData);
        }
        else {
            _this.canvas.width = 0;
            _this.canvas.height = 0;
        }
        return _this;
    }
    Object.defineProperty(Texture.prototype, "width", {
        get: function () { return this.canvas.width; },
        set: function (value) {
            this.canvas.width = value;
            this.markAsDirty();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Texture.prototype, "height", {
        get: function () { return this.canvas.height; },
        set: function (value) {
            this.canvas.height = value;
            this.markAsDirty();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Texture.prototype, "imageBitmap", {
        get: function () { return this.canvas; },
        enumerable: true,
        configurable: true
    });
    Texture.prototype.load = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                if (this.isLoaded) {
                    return [2, Promise.resolve()];
                }
                this.source = new Image();
                this.source.src = this.path;
                return [2, DOM_1.onceEvent(this.source, 'load').then(function (e) { return _this.draw(); })];
            });
        });
    };
    Texture.prototype.getImageData = function (sx, sy, sw, sh) {
        if (sx === void 0) { sx = 0; }
        if (sy === void 0) { sy = 0; }
        if (sw === void 0) { sw = this.width; }
        if (sh === void 0) { sh = this.height; }
        return this.ctx.getImageData(sx, sy, sw, sh);
    };
    Texture.prototype.setImageData = function (imageData, dx, dy, dirtyX, dirtyY, dirtyWidth, dirtyHeight) {
        if (dx === void 0) { dx = 0; }
        if (dy === void 0) { dy = 0; }
        if (dirtyX === void 0) { dirtyX = 0; }
        if (dirtyY === void 0) { dirtyY = 0; }
        if (dirtyWidth === void 0) { dirtyWidth = imageData.width; }
        if (dirtyHeight === void 0) { dirtyHeight = imageData.height; }
        this.ctx.putImageData(imageData, dx, dy, dirtyX, dirtyY, dirtyWidth, dirtyHeight);
    };
    Texture.prototype.clone = function () {
        return new Texture(this.path, this.getImageData());
    };
    Texture.prototype.markAsDirty = function () {
        var _this = this;
        if (this.isDirty) {
            return;
        }
        this.isDirty = true;
        if (!this.isLoaded) {
            return;
        }
        setTimeout(function () { return _this.draw(); });
    };
    Texture.prototype.draw = function () {
        if (this.width === 0 && this.height === 0) {
            this.canvas.width = this.source.width;
            this.canvas.height = this.source.height;
        }
        this.ctx.drawImage(this.source, 0, 0, this.source.width, this.source.height, 0, 0, this.width, this.height);
        this.isDirty = false;
        if (!this.isLoaded) {
            this._isLoaded.next(true);
        }
    };
    __decorate([
        Inject_1.Inject(BrowserDelegate_1.BrowserDelegate),
        __metadata("design:type", Object)
    ], Texture.prototype, "browser", void 0);
    return Texture;
}(Resource_1.Resource));
exports.Texture = Texture;


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var Texture_1 = __webpack_require__(22);
var Vector_1 = __webpack_require__(1);
var Rect_1 = __webpack_require__(64);
var BrowserDelegate_1 = __webpack_require__(4);
var Inject_1 = __webpack_require__(0);
var Class_1 = __webpack_require__(9);
var Sprite = (function () {
    function Sprite(texture) {
        this.pivot = new Vector_1.Vector(0.5, 0.5);
        this.rect = new Rect_1.Rect();
        this.canvas = this.browser.createCanvas();
        this.ctx = this.browser.getContext(this.canvas);
        this.setTexture(texture);
    }
    Object.defineProperty(Sprite.prototype, "texture", {
        get: function () { return this._texture; },
        set: function (texture) { this.setTexture(texture); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sprite.prototype, "width", {
        get: function () { return this.rect.width; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sprite.prototype, "height", {
        get: function () { return this.rect.height; },
        enumerable: true,
        configurable: true
    });
    Sprite.prototype.setTexture = function (texture) {
        var _this = this;
        if (this._texture === texture) {
            return;
        }
        this._texture = texture;
        if (this.textureLoaded) {
            this.textureLoaded.unsubscribe();
        }
        this.textureLoaded = texture.isLoaded$.subscribe(function () {
            return _this.onTextureLoaded();
        });
    };
    Sprite.prototype.onTextureLoaded = function () {
        if (this.rect.width === 0 && this.rect.height === 0) {
            this.rect.width = this._texture.width;
            this.rect.height = this._texture.height;
            this.canvas.width = this.rect.width;
            this.canvas.height = this.rect.height;
        }
        if (this.textureLoaded) {
            this.textureLoaded.unsubscribe();
            delete this.textureLoaded;
        }
        this.ctx.clearRect(0, 0, this.rect.width, this.rect.height);
        this.ctx.drawImage(this._texture.imageBitmap, this.rect.position.x, this.rect.position.y, this.rect.width, this.rect.height, 0, 0, this.rect.width, this.rect.height);
    };
    __decorate([
        Inject_1.Inject(BrowserDelegate_1.BrowserDelegate),
        __metadata("design:type", Object)
    ], Sprite.prototype, "browser", void 0);
    Sprite = __decorate([
        Class_1.Class(),
        __metadata("design:paramtypes", [Texture_1.Texture])
    ], Sprite);
    return Sprite;
}());
exports.Sprite = Sprite;


/***/ }),
/* 24 */,
/* 25 */,
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(70);
__webpack_require__(95);
__webpack_require__(96);
__webpack_require__(97);
__webpack_require__(99);
__webpack_require__(100);
__webpack_require__(101);
__webpack_require__(102);
__webpack_require__(103);
__webpack_require__(104);
__webpack_require__(105);
__webpack_require__(107);
__webpack_require__(109);
__webpack_require__(110);
__webpack_require__(111);


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var isArray_1 = __webpack_require__(73);
var isObject_1 = __webpack_require__(46);
var isFunction_1 = __webpack_require__(34);
var tryCatch_1 = __webpack_require__(47);
var errorObject_1 = __webpack_require__(35);
var UnsubscriptionError_1 = __webpack_require__(74);
/**
 * Represents a disposable resource, such as the execution of an Observable. A
 * Subscription has one important method, `unsubscribe`, that takes no argument
 * and just disposes the resource held by the subscription.
 *
 * Additionally, subscriptions may be grouped together through the `add()`
 * method, which will attach a child Subscription to the current Subscription.
 * When a Subscription is unsubscribed, all its children (and its grandchildren)
 * will be unsubscribed as well.
 *
 * @class Subscription
 */
var Subscription = (function () {
    /**
     * @param {function(): void} [unsubscribe] A function describing how to
     * perform the disposal of resources when the `unsubscribe` method is called.
     */
    function Subscription(unsubscribe) {
        /**
         * A flag to indicate whether this Subscription has already been unsubscribed.
         * @type {boolean}
         */
        this.closed = false;
        this._parent = null;
        this._parents = null;
        this._subscriptions = null;
        if (unsubscribe) {
            this._unsubscribe = unsubscribe;
        }
    }
    /**
     * Disposes the resources held by the subscription. May, for instance, cancel
     * an ongoing Observable execution or cancel any other type of work that
     * started when the Subscription was created.
     * @return {void}
     */
    Subscription.prototype.unsubscribe = function () {
        var hasErrors = false;
        var errors;
        if (this.closed) {
            return;
        }
        var _a = this, _parent = _a._parent, _parents = _a._parents, _unsubscribe = _a._unsubscribe, _subscriptions = _a._subscriptions;
        this.closed = true;
        this._parent = null;
        this._parents = null;
        // null out _subscriptions first so any child subscriptions that attempt
        // to remove themselves from this subscription will noop
        this._subscriptions = null;
        var index = -1;
        var len = _parents ? _parents.length : 0;
        // if this._parent is null, then so is this._parents, and we
        // don't have to remove ourselves from any parent subscriptions.
        while (_parent) {
            _parent.remove(this);
            // if this._parents is null or index >= len,
            // then _parent is set to null, and the loop exits
            _parent = ++index < len && _parents[index] || null;
        }
        if (isFunction_1.isFunction(_unsubscribe)) {
            var trial = tryCatch_1.tryCatch(_unsubscribe).call(this);
            if (trial === errorObject_1.errorObject) {
                hasErrors = true;
                errors = errors || (errorObject_1.errorObject.e instanceof UnsubscriptionError_1.UnsubscriptionError ?
                    flattenUnsubscriptionErrors(errorObject_1.errorObject.e.errors) : [errorObject_1.errorObject.e]);
            }
        }
        if (isArray_1.isArray(_subscriptions)) {
            index = -1;
            len = _subscriptions.length;
            while (++index < len) {
                var sub = _subscriptions[index];
                if (isObject_1.isObject(sub)) {
                    var trial = tryCatch_1.tryCatch(sub.unsubscribe).call(sub);
                    if (trial === errorObject_1.errorObject) {
                        hasErrors = true;
                        errors = errors || [];
                        var err = errorObject_1.errorObject.e;
                        if (err instanceof UnsubscriptionError_1.UnsubscriptionError) {
                            errors = errors.concat(flattenUnsubscriptionErrors(err.errors));
                        }
                        else {
                            errors.push(err);
                        }
                    }
                }
            }
        }
        if (hasErrors) {
            throw new UnsubscriptionError_1.UnsubscriptionError(errors);
        }
    };
    /**
     * Adds a tear down to be called during the unsubscribe() of this
     * Subscription.
     *
     * If the tear down being added is a subscription that is already
     * unsubscribed, is the same reference `add` is being called on, or is
     * `Subscription.EMPTY`, it will not be added.
     *
     * If this subscription is already in an `closed` state, the passed
     * tear down logic will be executed immediately.
     *
     * @param {TeardownLogic} teardown The additional logic to execute on
     * teardown.
     * @return {Subscription} Returns the Subscription used or created to be
     * added to the inner subscriptions list. This Subscription can be used with
     * `remove()` to remove the passed teardown logic from the inner subscriptions
     * list.
     */
    Subscription.prototype.add = function (teardown) {
        if (!teardown || (teardown === Subscription.EMPTY)) {
            return Subscription.EMPTY;
        }
        if (teardown === this) {
            return this;
        }
        var subscription = teardown;
        switch (typeof teardown) {
            case 'function':
                subscription = new Subscription(teardown);
            case 'object':
                if (subscription.closed || typeof subscription.unsubscribe !== 'function') {
                    return subscription;
                }
                else if (this.closed) {
                    subscription.unsubscribe();
                    return subscription;
                }
                else if (typeof subscription._addParent !== 'function' /* quack quack */) {
                    var tmp = subscription;
                    subscription = new Subscription();
                    subscription._subscriptions = [tmp];
                }
                break;
            default:
                throw new Error('unrecognized teardown ' + teardown + ' added to Subscription.');
        }
        var subscriptions = this._subscriptions || (this._subscriptions = []);
        subscriptions.push(subscription);
        subscription._addParent(this);
        return subscription;
    };
    /**
     * Removes a Subscription from the internal list of subscriptions that will
     * unsubscribe during the unsubscribe process of this Subscription.
     * @param {Subscription} subscription The subscription to remove.
     * @return {void}
     */
    Subscription.prototype.remove = function (subscription) {
        var subscriptions = this._subscriptions;
        if (subscriptions) {
            var subscriptionIndex = subscriptions.indexOf(subscription);
            if (subscriptionIndex !== -1) {
                subscriptions.splice(subscriptionIndex, 1);
            }
        }
    };
    Subscription.prototype._addParent = function (parent) {
        var _a = this, _parent = _a._parent, _parents = _a._parents;
        if (!_parent || _parent === parent) {
            // If we don't have a parent, or the new parent is the same as the
            // current parent, then set this._parent to the new parent.
            this._parent = parent;
        }
        else if (!_parents) {
            // If there's already one parent, but not multiple, allocate an Array to
            // store the rest of the parent Subscriptions.
            this._parents = [parent];
        }
        else if (_parents.indexOf(parent) === -1) {
            // Only add the new parent to the _parents list if it's not already there.
            _parents.push(parent);
        }
    };
    Subscription.EMPTY = (function (empty) {
        empty.closed = true;
        return empty;
    }(new Subscription()));
    return Subscription;
}());
exports.Subscription = Subscription;
function flattenUnsubscriptionErrors(errors) {
    return errors.reduce(function (errs, err) { return errs.concat((err instanceof UnsubscriptionError_1.UnsubscriptionError) ? err.errors : err); }, []);
}
//# sourceMappingURL=Subscription.js.map

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.GameObjectInitializer = Symbol('GameObjectInitializer');


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Vector_1 = __webpack_require__(1);
var Bounds = (function () {
    function Bounds() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.center = Vector_1.Vector.Get();
        this.extents = Vector_1.Vector.Get();
        this._canRecycle = false;
        if (args.length === 2) {
            this.reset(args[0], args[1]);
        }
        else if (args.length === 4) {
            this.reset(args[0], args[1], args[2], args[3]);
        }
    }
    Object.defineProperty(Bounds.prototype, "canRecycle", {
        get: function () { return this._canRecycle; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Bounds.prototype, "min", {
        get: function () {
            return this.center.clone().subtract(this.extents);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Bounds.prototype, "max", {
        get: function () {
            return this.center.clone().add(this.extents);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Bounds.prototype, "size", {
        get: function () {
            return this.extents.clone().multiply(2);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Bounds.prototype, "top", {
        get: function () { return this.center.y + this.extents.y; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Bounds.prototype, "bottom", {
        get: function () { return this.center.y - this.extents.y; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Bounds.prototype, "right", {
        get: function () { return this.center.x + this.extents.x; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Bounds.prototype, "left", {
        get: function () { return this.center.x - this.extents.x; },
        enumerable: true,
        configurable: true
    });
    Bounds.prototype.containPoint = function (point) {
        return point.greaterThanEqual(this.min) && point.lessThanEqual(this.max);
    };
    Bounds.prototype.intersects = function (bounds) {
        var minA = this.min;
        var maxA = this.max;
        var minB = bounds.min;
        var maxB = bounds.max;
        if (maxA.x < minB.x || minA.x > maxB.x) {
            return false;
        }
        if (maxA.y < minB.y || minA.y > maxB.y) {
            return false;
        }
        return true;
    };
    Bounds.prototype.reset = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (args.length === 2) {
            this.center.copy(args[0]);
            this.extents.copy(args[1]);
        }
        else if (args.length === 4) {
            this.center.setTo((args[2] + args[0]) / 2, (args[3] + args[1]) / 2);
            this.extents.setTo((args[2] - args[0]) / 2, (args[3] - args[1]) / 2);
        }
    };
    Bounds.prototype.destroy = function () {
        this._canRecycle = true;
        this.center.destroy();
        this.extents.destroy();
        this.min.destroy();
        this.max.destroy();
        this.size.destroy();
    };
    Bounds.prototype.toString = function () {
        return "Bounds (center: " + this.center + ", extents: " + this.extents + ")";
    };
    return Bounds;
}());
exports.Bounds = Bounds;


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ArrayUtility_1 = __webpack_require__(5);
function RequireComponent(RequireTypes) {
    return function (ComponentType) {
        var requireComponentTypes = Reflect.getMetadata('component:require', ComponentType) || [];
        RequireTypes.forEach(function (RequireType) { return ArrayUtility_1.addToArray(requireComponentTypes, RequireType); });
        Reflect.defineMetadata('component:require', requireComponentTypes, ComponentType);
    };
}
exports.RequireComponent = RequireComponent;


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ForceMode;
(function (ForceMode) {
    ForceMode[ForceMode["Force"] = 0] = "Force";
    ForceMode[ForceMode["Acceleration"] = 1] = "Acceleration";
    ForceMode[ForceMode["Impulse"] = 2] = "Impulse";
    ForceMode[ForceMode["VelocityChange"] = 3] = "VelocityChange";
})(ForceMode = exports.ForceMode || (exports.ForceMode = {}));


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.CollisionJumpTable = Symbol('CollisionJumpTable');


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var BaseObject_1 = __webpack_require__(41);
var Tree_1 = __webpack_require__(59);
var Bundle_1 = __webpack_require__(112);
var Camera_1 = __webpack_require__(63);
var ArrayUtility_1 = __webpack_require__(5);
var Inject_1 = __webpack_require__(0);
var Class_1 = __webpack_require__(9);
var BroadPhaseCollisionResolver_1 = __webpack_require__(42);
var NarrowPhaseCollisionResolver_1 = __webpack_require__(61);
var GameObjectInitializer_1 = __webpack_require__(28);
var RenderProcess_1 = __webpack_require__(57);
var runtime_1 = __webpack_require__(12);
var Scene = (function (_super) {
    __extends(Scene, _super);
    function Scene(broadPhaseCollisionResolver, narrowPhaseCollisionResolver, gameObjectInitializer, renderProcess, mainCamera) {
        var _this = _super.call(this) || this;
        _this.broadPhaseCollisionResolver = broadPhaseCollisionResolver;
        _this.narrowPhaseCollisionResolver = narrowPhaseCollisionResolver;
        _this.gameObjectInitializer = gameObjectInitializer;
        _this.renderProcess = renderProcess;
        _this.mainCamera = mainCamera;
        _this.resources = new Bundle_1.Bundle();
        _this.gameObjects = new Tree_1.Tree(null);
        _this.cameras = [];
        _this.add(_this.mainCamera);
        return _this;
    }
    Object.defineProperty(Scene.prototype, "isLoaded", {
        get: function () { return this.resources.isLoaded; },
        enumerable: true,
        configurable: true
    });
    Scene.prototype.add = function (gameObject, at) {
        if (!this.gameObjects.add(gameObject.node)) {
            return false;
        }
        if (!gameObject.hasStarted) {
            gameObject.node.hide();
        }
        if (gameObject instanceof Camera_1.Camera) {
            ArrayUtility_1.addToArray(this.cameras, gameObject);
        }
        if (at) {
            gameObject.transform.position.copy(at);
        }
        return true;
    };
    Scene.prototype.remove = function (gameObject) {
        gameObject.node.show();
        if (!this.gameObjects.remove(gameObject.node)) {
            return false;
        }
        if (gameObject instanceof Camera_1.Camera) {
            ArrayUtility_1.removeFromArray(this.cameras, gameObject);
        }
        return true;
    };
    Scene.prototype.has = function (gameObject) {
        return this.gameObjects.hasChild(gameObject.node);
    };
    Scene.prototype.load = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.resources.load()];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    Scene.prototype.fixedUpdate = function (alpha) {
        this.gameObjects.forEachChildren(function (gameObject) { return gameObject.fixedUpdate(alpha); });
        this.broadPhaseCollisionResolver.fixedUpdate();
        this.narrowPhaseCollisionResolver.resolve(this.broadPhaseCollisionResolver.pairs);
    };
    Scene.prototype.update = function () {
        this.gameObjects.forEachChildren(function (gameObject) { return gameObject.update(); });
        this.broadPhaseCollisionResolver.update();
        this.narrowPhaseCollisionResolver.resolve(this.broadPhaseCollisionResolver.pairs);
    };
    Scene.prototype.lateUpdate = function () {
        this.gameObjects.forEachChildren(function (gameObject) { return gameObject.lateUpdate(); });
    };
    Scene.prototype.preRender = function () {
        this.gameObjects.forEachChildren(function (gameObject) { return gameObject.preRender(); });
    };
    Scene.prototype.render = function (ctx, width, height) {
        var _this = this;
        this.renderProcess.useContext(ctx, width, height);
        this.cameras.forEach(function (camera) { return _this.renderProcess.render(camera, _this.gameObjects); });
        runtime_1.ifdef(runtime_1.DEBUG_PHYSICS, function () { return _this.cameras.forEach(function (camera) { return _this.broadPhaseCollisionResolver.debugRender(ctx, camera); }); });
    };
    Scene.prototype.postRender = function () {
        this.gameObjects.forEachChildren(function (gameObject) { return gameObject.postRender(); });
        this.gameObjectInitializer.resolve();
    };
    Scene.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        this.gameObjects.forEachChildren(function (gameObject) { return gameObject.destroy(); });
    };
    Scene.prototype.toString = function () {
        return "Scene(" + this.name + ")";
    };
    Scene = __decorate([
        Class_1.Class(),
        __param(0, Inject_1.Inject(BroadPhaseCollisionResolver_1.BroadPhaseCollisionResolver)),
        __param(1, Inject_1.Inject(NarrowPhaseCollisionResolver_1.NarrowPhaseCollisionResolver)),
        __param(2, Inject_1.Inject(GameObjectInitializer_1.GameObjectInitializer)),
        __param(3, Inject_1.Inject(RenderProcess_1.RenderProcess)),
        __param(4, Inject_1.Inject(Camera_1.MainCamera)),
        __metadata("design:paramtypes", [Object, Object, Object, Object, Camera_1.Camera])
    ], Scene);
    return Scene;
}(BaseObject_1.BaseObject));
exports.Scene = Scene;


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function isFunction(x) {
    return typeof x === 'function';
}
exports.isFunction = isFunction;
//# sourceMappingURL=isFunction.js.map

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// typeof any so that it we don't have to cast when comparing a result to the error object
exports.errorObject = { e: {} };
//# sourceMappingURL=errorObject.js.map

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var root_1 = __webpack_require__(18);
var Symbol = root_1.root.Symbol;
exports.rxSubscriber = (typeof Symbol === 'function' && typeof Symbol.for === 'function') ?
    Symbol.for('rxSubscriber') : '@@rxSubscriber';
/**
 * @deprecated use rxSubscriber instead
 */
exports.$$rxSubscriber = exports.rxSubscriber;
//# sourceMappingURL=rxSubscriber.js.map

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(51);
var Type_1 = __webpack_require__(14);
var ProviderRegistry = (function () {
    function ProviderRegistry() {
        this.providers = new Map();
        this.service = new Map();
    }
    ProviderRegistry.prototype.provide = function (provider) {
        this.providers.set(provider.token, provider);
    };
    ProviderRegistry.prototype.resolve = function (token) {
        return this.providers.get(token);
    };
    ProviderRegistry.prototype.get = function (token) {
        var resolvedToken = Type_1.resolveForwardRef(token);
        if (this.service.has(resolvedToken)) {
            return this.service.get(resolvedToken);
        }
        var provider = this.resolve(resolvedToken);
        if (!provider) {
            return;
        }
        var service;
        if (provider.useClass) {
            service = this.instantiate(provider.useClass);
        }
        if (provider.useFactory) {
            service = this.create(provider.useFactory);
        }
        if (provider.useValue) {
            service = provider.useValue;
        }
        if (service) {
            this.service.set(resolvedToken, service);
        }
        return service;
    };
    ProviderRegistry.prototype.instantiate = function (InstanceType) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        this.resolveDependencies(InstanceType, args);
        return new (InstanceType.bind.apply(InstanceType, [void 0].concat(args)))();
    };
    ProviderRegistry.prototype.create = function (factory) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        this.resolveDependencies(factory, args);
        return factory.apply(void 0, args);
    };
    ProviderRegistry.prototype.resolveDependencies = function (target, args) {
        var _this = this;
        var dependencies = Reflect.getMetadata('design:paramtypes', target) || [];
        dependencies.forEach(function (dependency, index) {
            if (!args[index]) {
                args[index] = _this.get(dependency);
            }
        });
    };
    return ProviderRegistry;
}());
exports.ProviderRegistry = ProviderRegistry;
exports.providerRegistry = new ProviderRegistry();


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Observable_1 = __webpack_require__(3);
var Subscriber_1 = __webpack_require__(13);
var Subscription_1 = __webpack_require__(27);
var ObjectUnsubscribedError_1 = __webpack_require__(53);
var SubjectSubscription_1 = __webpack_require__(98);
var rxSubscriber_1 = __webpack_require__(36);
/**
 * @class SubjectSubscriber<T>
 */
var SubjectSubscriber = (function (_super) {
    __extends(SubjectSubscriber, _super);
    function SubjectSubscriber(destination) {
        _super.call(this, destination);
        this.destination = destination;
    }
    return SubjectSubscriber;
}(Subscriber_1.Subscriber));
exports.SubjectSubscriber = SubjectSubscriber;
/**
 * @class Subject<T>
 */
var Subject = (function (_super) {
    __extends(Subject, _super);
    function Subject() {
        _super.call(this);
        this.observers = [];
        this.closed = false;
        this.isStopped = false;
        this.hasError = false;
        this.thrownError = null;
    }
    Subject.prototype[rxSubscriber_1.rxSubscriber] = function () {
        return new SubjectSubscriber(this);
    };
    Subject.prototype.lift = function (operator) {
        var subject = new AnonymousSubject(this, this);
        subject.operator = operator;
        return subject;
    };
    Subject.prototype.next = function (value) {
        if (this.closed) {
            throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
        }
        if (!this.isStopped) {
            var observers = this.observers;
            var len = observers.length;
            var copy = observers.slice();
            for (var i = 0; i < len; i++) {
                copy[i].next(value);
            }
        }
    };
    Subject.prototype.error = function (err) {
        if (this.closed) {
            throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
        }
        this.hasError = true;
        this.thrownError = err;
        this.isStopped = true;
        var observers = this.observers;
        var len = observers.length;
        var copy = observers.slice();
        for (var i = 0; i < len; i++) {
            copy[i].error(err);
        }
        this.observers.length = 0;
    };
    Subject.prototype.complete = function () {
        if (this.closed) {
            throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
        }
        this.isStopped = true;
        var observers = this.observers;
        var len = observers.length;
        var copy = observers.slice();
        for (var i = 0; i < len; i++) {
            copy[i].complete();
        }
        this.observers.length = 0;
    };
    Subject.prototype.unsubscribe = function () {
        this.isStopped = true;
        this.closed = true;
        this.observers = null;
    };
    Subject.prototype._trySubscribe = function (subscriber) {
        if (this.closed) {
            throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
        }
        else {
            return _super.prototype._trySubscribe.call(this, subscriber);
        }
    };
    Subject.prototype._subscribe = function (subscriber) {
        if (this.closed) {
            throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
        }
        else if (this.hasError) {
            subscriber.error(this.thrownError);
            return Subscription_1.Subscription.EMPTY;
        }
        else if (this.isStopped) {
            subscriber.complete();
            return Subscription_1.Subscription.EMPTY;
        }
        else {
            this.observers.push(subscriber);
            return new SubjectSubscription_1.SubjectSubscription(this, subscriber);
        }
    };
    Subject.prototype.asObservable = function () {
        var observable = new Observable_1.Observable();
        observable.source = this;
        return observable;
    };
    Subject.create = function (destination, source) {
        return new AnonymousSubject(destination, source);
    };
    return Subject;
}(Observable_1.Observable));
exports.Subject = Subject;
/**
 * @class AnonymousSubject<T>
 */
var AnonymousSubject = (function (_super) {
    __extends(AnonymousSubject, _super);
    function AnonymousSubject(destination, source) {
        _super.call(this);
        this.destination = destination;
        this.source = source;
    }
    AnonymousSubject.prototype.next = function (value) {
        var destination = this.destination;
        if (destination && destination.next) {
            destination.next(value);
        }
    };
    AnonymousSubject.prototype.error = function (err) {
        var destination = this.destination;
        if (destination && destination.error) {
            this.destination.error(err);
        }
    };
    AnonymousSubject.prototype.complete = function () {
        var destination = this.destination;
        if (destination && destination.complete) {
            this.destination.complete();
        }
    };
    AnonymousSubject.prototype._subscribe = function (subscriber) {
        var source = this.source;
        if (source) {
            return this.source.subscribe(subscriber);
        }
        else {
            return Subscription_1.Subscription.EMPTY;
        }
    };
    return AnonymousSubject;
}(Subject));
exports.AnonymousSubject = AnonymousSubject;
//# sourceMappingURL=Subject.js.map

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyboardInput = Symbol('KeyboardInput');


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.PointerInput = Symbol('PointerInput');


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var BaseObject = (function () {
    function BaseObject() {
        this.name = '';
        this._isActive = false;
        this._destroyed = false;
        this._hasStarted = false;
        this.id = BaseObject.NextId++;
    }
    Object.defineProperty(BaseObject.prototype, "isActive", {
        get: function () { return this._isActive; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseObject.prototype, "canRecycle", {
        get: function () { return this._destroyed; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseObject.prototype, "isDestroyed", {
        get: function () { return this._destroyed; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseObject.prototype, "hasStarted", {
        get: function () { return this._hasStarted; },
        enumerable: true,
        configurable: true
    });
    BaseObject.prototype.activate = function () {
        this._isActive = true;
    };
    BaseObject.prototype.deactivate = function () {
        this._isActive = false;
    };
    BaseObject.prototype.reset = function () {
        this._destroyed = false;
        this._isActive = true;
    };
    BaseObject.prototype.start = function () {
        this.activate();
        this._hasStarted = true;
    };
    BaseObject.prototype.fixedUpdate = function (alpha) { return; };
    BaseObject.prototype.update = function () { return; };
    BaseObject.prototype.lateUpdate = function () { return; };
    BaseObject.prototype.preRender = function () { return; };
    BaseObject.prototype.postRender = function () { return; };
    BaseObject.prototype.destroy = function () {
        this._destroyed = true;
        this._isActive = false;
    };
    BaseObject.NextId = 0;
    return BaseObject;
}());
exports.BaseObject = BaseObject;


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.BroadPhaseCollisionResolver = Symbol('BroadPhaseCollisionResolver');


/***/ }),
/* 43 */,
/* 44 */,
/* 45 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function isObject(x) {
    return x != null && typeof x === 'object';
}
exports.isObject = isObject;
//# sourceMappingURL=isObject.js.map

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var errorObject_1 = __webpack_require__(35);
var tryCatchTarget;
function tryCatcher() {
    try {
        return tryCatchTarget.apply(this, arguments);
    }
    catch (e) {
        errorObject_1.errorObject.e = e;
        return errorObject_1.errorObject;
    }
}
function tryCatch(fn) {
    tryCatchTarget = fn;
    return tryCatcher;
}
exports.tryCatch = tryCatch;
;
//# sourceMappingURL=tryCatch.js.map

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.empty = {
    closed: true,
    next: function (value) { },
    error: function (err) { throw err; },
    complete: function () { }
};
//# sourceMappingURL=Observer.js.map

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var root_1 = __webpack_require__(18);
function getSymbolObservable(context) {
    var $$observable;
    var Symbol = context.Symbol;
    if (typeof Symbol === 'function') {
        if (Symbol.observable) {
            $$observable = Symbol.observable;
        }
        else {
            $$observable = Symbol('observable');
            Symbol.observable = $$observable;
        }
    }
    else {
        $$observable = '@@observable';
    }
    return $$observable;
}
exports.getSymbolObservable = getSymbolObservable;
exports.observable = getSymbolObservable(root_1.root);
/**
 * @deprecated use observable instead
 */
exports.$$observable = exports.observable;
//# sourceMappingURL=observable.js.map

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function isScheduler(value) {
    return value && typeof value.schedule === 'function';
}
exports.isScheduler = isScheduler;
//# sourceMappingURL=isScheduler.js.map

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process, global) {/*! *****************************************************************************
Copyright (C) Microsoft. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
var Reflect;
(function (Reflect) {
    "use strict";
    var hasOwn = Object.prototype.hasOwnProperty;
    // feature test for Symbol support
    var supportsSymbol = typeof Symbol === "function";
    var toPrimitiveSymbol = supportsSymbol && typeof Symbol.toPrimitive !== "undefined" ? Symbol.toPrimitive : "@@toPrimitive";
    var iteratorSymbol = supportsSymbol && typeof Symbol.iterator !== "undefined" ? Symbol.iterator : "@@iterator";
    var HashMap;
    (function (HashMap) {
        var supportsCreate = typeof Object.create === "function"; // feature test for Object.create support
        var supportsProto = { __proto__: [] } instanceof Array; // feature test for __proto__ support
        var downLevel = !supportsCreate && !supportsProto;
        // create an object in dictionary mode (a.k.a. "slow" mode in v8)
        HashMap.create = supportsCreate
            ? function () { return MakeDictionary(Object.create(null)); }
            : supportsProto
                ? function () { return MakeDictionary({ __proto__: null }); }
                : function () { return MakeDictionary({}); };
        HashMap.has = downLevel
            ? function (map, key) { return hasOwn.call(map, key); }
            : function (map, key) { return key in map; };
        HashMap.get = downLevel
            ? function (map, key) { return hasOwn.call(map, key) ? map[key] : undefined; }
            : function (map, key) { return map[key]; };
    })(HashMap || (HashMap = {}));
    // Load global or shim versions of Map, Set, and WeakMap
    var functionPrototype = Object.getPrototypeOf(Function);
    var usePolyfill = typeof process === "object" && process.env && process.env["REFLECT_METADATA_USE_MAP_POLYFILL"] === "true";
    var _Map = !usePolyfill && typeof Map === "function" && typeof Map.prototype.entries === "function" ? Map : CreateMapPolyfill();
    var _Set = !usePolyfill && typeof Set === "function" && typeof Set.prototype.entries === "function" ? Set : CreateSetPolyfill();
    var _WeakMap = !usePolyfill && typeof WeakMap === "function" ? WeakMap : CreateWeakMapPolyfill();
    // [[Metadata]] internal slot
    // https://rbuckton.github.io/reflect-metadata/#ordinary-object-internal-methods-and-internal-slots
    var Metadata = new _WeakMap();
    /**
      * Applies a set of decorators to a property of a target object.
      * @param decorators An array of decorators.
      * @param target The target object.
      * @param propertyKey (Optional) The property key to decorate.
      * @param attributes (Optional) The property descriptor for the target key.
      * @remarks Decorators are applied in reverse order.
      * @example
      *
      *     class Example {
      *         // property declarations are not part of ES6, though they are valid in TypeScript:
      *         // static staticProperty;
      *         // property;
      *
      *         constructor(p) { }
      *         static staticMethod(p) { }
      *         method(p) { }
      *     }
      *
      *     // constructor
      *     Example = Reflect.decorate(decoratorsArray, Example);
      *
      *     // property (on constructor)
      *     Reflect.decorate(decoratorsArray, Example, "staticProperty");
      *
      *     // property (on prototype)
      *     Reflect.decorate(decoratorsArray, Example.prototype, "property");
      *
      *     // method (on constructor)
      *     Object.defineProperty(Example, "staticMethod",
      *         Reflect.decorate(decoratorsArray, Example, "staticMethod",
      *             Object.getOwnPropertyDescriptor(Example, "staticMethod")));
      *
      *     // method (on prototype)
      *     Object.defineProperty(Example.prototype, "method",
      *         Reflect.decorate(decoratorsArray, Example.prototype, "method",
      *             Object.getOwnPropertyDescriptor(Example.prototype, "method")));
      *
      */
    function decorate(decorators, target, propertyKey, attributes) {
        if (!IsUndefined(propertyKey)) {
            if (!IsArray(decorators))
                throw new TypeError();
            if (!IsObject(target))
                throw new TypeError();
            if (!IsObject(attributes) && !IsUndefined(attributes) && !IsNull(attributes))
                throw new TypeError();
            if (IsNull(attributes))
                attributes = undefined;
            propertyKey = ToPropertyKey(propertyKey);
            return DecorateProperty(decorators, target, propertyKey, attributes);
        }
        else {
            if (!IsArray(decorators))
                throw new TypeError();
            if (!IsConstructor(target))
                throw new TypeError();
            return DecorateConstructor(decorators, target);
        }
    }
    Reflect.decorate = decorate;
    // 4.1.2 Reflect.metadata(metadataKey, metadataValue)
    // https://rbuckton.github.io/reflect-metadata/#reflect.metadata
    /**
      * A default metadata decorator factory that can be used on a class, class member, or parameter.
      * @param metadataKey The key for the metadata entry.
      * @param metadataValue The value for the metadata entry.
      * @returns A decorator function.
      * @remarks
      * If `metadataKey` is already defined for the target and target key, the
      * metadataValue for that key will be overwritten.
      * @example
      *
      *     // constructor
      *     @Reflect.metadata(key, value)
      *     class Example {
      *     }
      *
      *     // property (on constructor, TypeScript only)
      *     class Example {
      *         @Reflect.metadata(key, value)
      *         static staticProperty;
      *     }
      *
      *     // property (on prototype, TypeScript only)
      *     class Example {
      *         @Reflect.metadata(key, value)
      *         property;
      *     }
      *
      *     // method (on constructor)
      *     class Example {
      *         @Reflect.metadata(key, value)
      *         static staticMethod() { }
      *     }
      *
      *     // method (on prototype)
      *     class Example {
      *         @Reflect.metadata(key, value)
      *         method() { }
      *     }
      *
      */
    function metadata(metadataKey, metadataValue) {
        function decorator(target, propertyKey) {
            if (!IsObject(target))
                throw new TypeError();
            if (!IsUndefined(propertyKey) && !IsPropertyKey(propertyKey))
                throw new TypeError();
            OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, propertyKey);
        }
        return decorator;
    }
    Reflect.metadata = metadata;
    /**
      * Define a unique metadata entry on the target.
      * @param metadataKey A key used to store and retrieve metadata.
      * @param metadataValue A value that contains attached metadata.
      * @param target The target object on which to define metadata.
      * @param propertyKey (Optional) The property key for the target.
      * @example
      *
      *     class Example {
      *         // property declarations are not part of ES6, though they are valid in TypeScript:
      *         // static staticProperty;
      *         // property;
      *
      *         constructor(p) { }
      *         static staticMethod(p) { }
      *         method(p) { }
      *     }
      *
      *     // constructor
      *     Reflect.defineMetadata("custom:annotation", options, Example);
      *
      *     // property (on constructor)
      *     Reflect.defineMetadata("custom:annotation", options, Example, "staticProperty");
      *
      *     // property (on prototype)
      *     Reflect.defineMetadata("custom:annotation", options, Example.prototype, "property");
      *
      *     // method (on constructor)
      *     Reflect.defineMetadata("custom:annotation", options, Example, "staticMethod");
      *
      *     // method (on prototype)
      *     Reflect.defineMetadata("custom:annotation", options, Example.prototype, "method");
      *
      *     // decorator factory as metadata-producing annotation.
      *     function MyAnnotation(options): Decorator {
      *         return (target, key?) => Reflect.defineMetadata("custom:annotation", options, target, key);
      *     }
      *
      */
    function defineMetadata(metadataKey, metadataValue, target, propertyKey) {
        if (!IsObject(target))
            throw new TypeError();
        if (!IsUndefined(propertyKey))
            propertyKey = ToPropertyKey(propertyKey);
        return OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, propertyKey);
    }
    Reflect.defineMetadata = defineMetadata;
    /**
      * Gets a value indicating whether the target object or its prototype chain has the provided metadata key defined.
      * @param metadataKey A key used to store and retrieve metadata.
      * @param target The target object on which the metadata is defined.
      * @param propertyKey (Optional) The property key for the target.
      * @returns `true` if the metadata key was defined on the target object or its prototype chain; otherwise, `false`.
      * @example
      *
      *     class Example {
      *         // property declarations are not part of ES6, though they are valid in TypeScript:
      *         // static staticProperty;
      *         // property;
      *
      *         constructor(p) { }
      *         static staticMethod(p) { }
      *         method(p) { }
      *     }
      *
      *     // constructor
      *     result = Reflect.hasMetadata("custom:annotation", Example);
      *
      *     // property (on constructor)
      *     result = Reflect.hasMetadata("custom:annotation", Example, "staticProperty");
      *
      *     // property (on prototype)
      *     result = Reflect.hasMetadata("custom:annotation", Example.prototype, "property");
      *
      *     // method (on constructor)
      *     result = Reflect.hasMetadata("custom:annotation", Example, "staticMethod");
      *
      *     // method (on prototype)
      *     result = Reflect.hasMetadata("custom:annotation", Example.prototype, "method");
      *
      */
    function hasMetadata(metadataKey, target, propertyKey) {
        if (!IsObject(target))
            throw new TypeError();
        if (!IsUndefined(propertyKey))
            propertyKey = ToPropertyKey(propertyKey);
        return OrdinaryHasMetadata(metadataKey, target, propertyKey);
    }
    Reflect.hasMetadata = hasMetadata;
    /**
      * Gets a value indicating whether the target object has the provided metadata key defined.
      * @param metadataKey A key used to store and retrieve metadata.
      * @param target The target object on which the metadata is defined.
      * @param propertyKey (Optional) The property key for the target.
      * @returns `true` if the metadata key was defined on the target object; otherwise, `false`.
      * @example
      *
      *     class Example {
      *         // property declarations are not part of ES6, though they are valid in TypeScript:
      *         // static staticProperty;
      *         // property;
      *
      *         constructor(p) { }
      *         static staticMethod(p) { }
      *         method(p) { }
      *     }
      *
      *     // constructor
      *     result = Reflect.hasOwnMetadata("custom:annotation", Example);
      *
      *     // property (on constructor)
      *     result = Reflect.hasOwnMetadata("custom:annotation", Example, "staticProperty");
      *
      *     // property (on prototype)
      *     result = Reflect.hasOwnMetadata("custom:annotation", Example.prototype, "property");
      *
      *     // method (on constructor)
      *     result = Reflect.hasOwnMetadata("custom:annotation", Example, "staticMethod");
      *
      *     // method (on prototype)
      *     result = Reflect.hasOwnMetadata("custom:annotation", Example.prototype, "method");
      *
      */
    function hasOwnMetadata(metadataKey, target, propertyKey) {
        if (!IsObject(target))
            throw new TypeError();
        if (!IsUndefined(propertyKey))
            propertyKey = ToPropertyKey(propertyKey);
        return OrdinaryHasOwnMetadata(metadataKey, target, propertyKey);
    }
    Reflect.hasOwnMetadata = hasOwnMetadata;
    /**
      * Gets the metadata value for the provided metadata key on the target object or its prototype chain.
      * @param metadataKey A key used to store and retrieve metadata.
      * @param target The target object on which the metadata is defined.
      * @param propertyKey (Optional) The property key for the target.
      * @returns The metadata value for the metadata key if found; otherwise, `undefined`.
      * @example
      *
      *     class Example {
      *         // property declarations are not part of ES6, though they are valid in TypeScript:
      *         // static staticProperty;
      *         // property;
      *
      *         constructor(p) { }
      *         static staticMethod(p) { }
      *         method(p) { }
      *     }
      *
      *     // constructor
      *     result = Reflect.getMetadata("custom:annotation", Example);
      *
      *     // property (on constructor)
      *     result = Reflect.getMetadata("custom:annotation", Example, "staticProperty");
      *
      *     // property (on prototype)
      *     result = Reflect.getMetadata("custom:annotation", Example.prototype, "property");
      *
      *     // method (on constructor)
      *     result = Reflect.getMetadata("custom:annotation", Example, "staticMethod");
      *
      *     // method (on prototype)
      *     result = Reflect.getMetadata("custom:annotation", Example.prototype, "method");
      *
      */
    function getMetadata(metadataKey, target, propertyKey) {
        if (!IsObject(target))
            throw new TypeError();
        if (!IsUndefined(propertyKey))
            propertyKey = ToPropertyKey(propertyKey);
        return OrdinaryGetMetadata(metadataKey, target, propertyKey);
    }
    Reflect.getMetadata = getMetadata;
    /**
      * Gets the metadata value for the provided metadata key on the target object.
      * @param metadataKey A key used to store and retrieve metadata.
      * @param target The target object on which the metadata is defined.
      * @param propertyKey (Optional) The property key for the target.
      * @returns The metadata value for the metadata key if found; otherwise, `undefined`.
      * @example
      *
      *     class Example {
      *         // property declarations are not part of ES6, though they are valid in TypeScript:
      *         // static staticProperty;
      *         // property;
      *
      *         constructor(p) { }
      *         static staticMethod(p) { }
      *         method(p) { }
      *     }
      *
      *     // constructor
      *     result = Reflect.getOwnMetadata("custom:annotation", Example);
      *
      *     // property (on constructor)
      *     result = Reflect.getOwnMetadata("custom:annotation", Example, "staticProperty");
      *
      *     // property (on prototype)
      *     result = Reflect.getOwnMetadata("custom:annotation", Example.prototype, "property");
      *
      *     // method (on constructor)
      *     result = Reflect.getOwnMetadata("custom:annotation", Example, "staticMethod");
      *
      *     // method (on prototype)
      *     result = Reflect.getOwnMetadata("custom:annotation", Example.prototype, "method");
      *
      */
    function getOwnMetadata(metadataKey, target, propertyKey) {
        if (!IsObject(target))
            throw new TypeError();
        if (!IsUndefined(propertyKey))
            propertyKey = ToPropertyKey(propertyKey);
        return OrdinaryGetOwnMetadata(metadataKey, target, propertyKey);
    }
    Reflect.getOwnMetadata = getOwnMetadata;
    /**
      * Gets the metadata keys defined on the target object or its prototype chain.
      * @param target The target object on which the metadata is defined.
      * @param propertyKey (Optional) The property key for the target.
      * @returns An array of unique metadata keys.
      * @example
      *
      *     class Example {
      *         // property declarations are not part of ES6, though they are valid in TypeScript:
      *         // static staticProperty;
      *         // property;
      *
      *         constructor(p) { }
      *         static staticMethod(p) { }
      *         method(p) { }
      *     }
      *
      *     // constructor
      *     result = Reflect.getMetadataKeys(Example);
      *
      *     // property (on constructor)
      *     result = Reflect.getMetadataKeys(Example, "staticProperty");
      *
      *     // property (on prototype)
      *     result = Reflect.getMetadataKeys(Example.prototype, "property");
      *
      *     // method (on constructor)
      *     result = Reflect.getMetadataKeys(Example, "staticMethod");
      *
      *     // method (on prototype)
      *     result = Reflect.getMetadataKeys(Example.prototype, "method");
      *
      */
    function getMetadataKeys(target, propertyKey) {
        if (!IsObject(target))
            throw new TypeError();
        if (!IsUndefined(propertyKey))
            propertyKey = ToPropertyKey(propertyKey);
        return OrdinaryMetadataKeys(target, propertyKey);
    }
    Reflect.getMetadataKeys = getMetadataKeys;
    /**
      * Gets the unique metadata keys defined on the target object.
      * @param target The target object on which the metadata is defined.
      * @param propertyKey (Optional) The property key for the target.
      * @returns An array of unique metadata keys.
      * @example
      *
      *     class Example {
      *         // property declarations are not part of ES6, though they are valid in TypeScript:
      *         // static staticProperty;
      *         // property;
      *
      *         constructor(p) { }
      *         static staticMethod(p) { }
      *         method(p) { }
      *     }
      *
      *     // constructor
      *     result = Reflect.getOwnMetadataKeys(Example);
      *
      *     // property (on constructor)
      *     result = Reflect.getOwnMetadataKeys(Example, "staticProperty");
      *
      *     // property (on prototype)
      *     result = Reflect.getOwnMetadataKeys(Example.prototype, "property");
      *
      *     // method (on constructor)
      *     result = Reflect.getOwnMetadataKeys(Example, "staticMethod");
      *
      *     // method (on prototype)
      *     result = Reflect.getOwnMetadataKeys(Example.prototype, "method");
      *
      */
    function getOwnMetadataKeys(target, propertyKey) {
        if (!IsObject(target))
            throw new TypeError();
        if (!IsUndefined(propertyKey))
            propertyKey = ToPropertyKey(propertyKey);
        return OrdinaryOwnMetadataKeys(target, propertyKey);
    }
    Reflect.getOwnMetadataKeys = getOwnMetadataKeys;
    /**
      * Deletes the metadata entry from the target object with the provided key.
      * @param metadataKey A key used to store and retrieve metadata.
      * @param target The target object on which the metadata is defined.
      * @param propertyKey (Optional) The property key for the target.
      * @returns `true` if the metadata entry was found and deleted; otherwise, false.
      * @example
      *
      *     class Example {
      *         // property declarations are not part of ES6, though they are valid in TypeScript:
      *         // static staticProperty;
      *         // property;
      *
      *         constructor(p) { }
      *         static staticMethod(p) { }
      *         method(p) { }
      *     }
      *
      *     // constructor
      *     result = Reflect.deleteMetadata("custom:annotation", Example);
      *
      *     // property (on constructor)
      *     result = Reflect.deleteMetadata("custom:annotation", Example, "staticProperty");
      *
      *     // property (on prototype)
      *     result = Reflect.deleteMetadata("custom:annotation", Example.prototype, "property");
      *
      *     // method (on constructor)
      *     result = Reflect.deleteMetadata("custom:annotation", Example, "staticMethod");
      *
      *     // method (on prototype)
      *     result = Reflect.deleteMetadata("custom:annotation", Example.prototype, "method");
      *
      */
    function deleteMetadata(metadataKey, target, propertyKey) {
        if (!IsObject(target))
            throw new TypeError();
        if (!IsUndefined(propertyKey))
            propertyKey = ToPropertyKey(propertyKey);
        var metadataMap = GetOrCreateMetadataMap(target, propertyKey, /*Create*/ false);
        if (IsUndefined(metadataMap))
            return false;
        if (!metadataMap.delete(metadataKey))
            return false;
        if (metadataMap.size > 0)
            return true;
        var targetMetadata = Metadata.get(target);
        targetMetadata.delete(propertyKey);
        if (targetMetadata.size > 0)
            return true;
        Metadata.delete(target);
        return true;
    }
    Reflect.deleteMetadata = deleteMetadata;
    function DecorateConstructor(decorators, target) {
        for (var i = decorators.length - 1; i >= 0; --i) {
            var decorator = decorators[i];
            var decorated = decorator(target);
            if (!IsUndefined(decorated) && !IsNull(decorated)) {
                if (!IsConstructor(decorated))
                    throw new TypeError();
                target = decorated;
            }
        }
        return target;
    }
    function DecorateProperty(decorators, target, propertyKey, descriptor) {
        for (var i = decorators.length - 1; i >= 0; --i) {
            var decorator = decorators[i];
            var decorated = decorator(target, propertyKey, descriptor);
            if (!IsUndefined(decorated) && !IsNull(decorated)) {
                if (!IsObject(decorated))
                    throw new TypeError();
                descriptor = decorated;
            }
        }
        return descriptor;
    }
    function GetOrCreateMetadataMap(O, P, Create) {
        var targetMetadata = Metadata.get(O);
        if (IsUndefined(targetMetadata)) {
            if (!Create)
                return undefined;
            targetMetadata = new _Map();
            Metadata.set(O, targetMetadata);
        }
        var metadataMap = targetMetadata.get(P);
        if (IsUndefined(metadataMap)) {
            if (!Create)
                return undefined;
            metadataMap = new _Map();
            targetMetadata.set(P, metadataMap);
        }
        return metadataMap;
    }
    // 3.1.1.1 OrdinaryHasMetadata(MetadataKey, O, P)
    // https://rbuckton.github.io/reflect-metadata/#ordinaryhasmetadata
    function OrdinaryHasMetadata(MetadataKey, O, P) {
        var hasOwn = OrdinaryHasOwnMetadata(MetadataKey, O, P);
        if (hasOwn)
            return true;
        var parent = OrdinaryGetPrototypeOf(O);
        if (!IsNull(parent))
            return OrdinaryHasMetadata(MetadataKey, parent, P);
        return false;
    }
    // 3.1.2.1 OrdinaryHasOwnMetadata(MetadataKey, O, P)
    // https://rbuckton.github.io/reflect-metadata/#ordinaryhasownmetadata
    function OrdinaryHasOwnMetadata(MetadataKey, O, P) {
        var metadataMap = GetOrCreateMetadataMap(O, P, /*Create*/ false);
        if (IsUndefined(metadataMap))
            return false;
        return ToBoolean(metadataMap.has(MetadataKey));
    }
    // 3.1.3.1 OrdinaryGetMetadata(MetadataKey, O, P)
    // https://rbuckton.github.io/reflect-metadata/#ordinarygetmetadata
    function OrdinaryGetMetadata(MetadataKey, O, P) {
        var hasOwn = OrdinaryHasOwnMetadata(MetadataKey, O, P);
        if (hasOwn)
            return OrdinaryGetOwnMetadata(MetadataKey, O, P);
        var parent = OrdinaryGetPrototypeOf(O);
        if (!IsNull(parent))
            return OrdinaryGetMetadata(MetadataKey, parent, P);
        return undefined;
    }
    // 3.1.4.1 OrdinaryGetOwnMetadata(MetadataKey, O, P)
    // https://rbuckton.github.io/reflect-metadata/#ordinarygetownmetadata
    function OrdinaryGetOwnMetadata(MetadataKey, O, P) {
        var metadataMap = GetOrCreateMetadataMap(O, P, /*Create*/ false);
        if (IsUndefined(metadataMap))
            return undefined;
        return metadataMap.get(MetadataKey);
    }
    // 3.1.5.1 OrdinaryDefineOwnMetadata(MetadataKey, MetadataValue, O, P)
    // https://rbuckton.github.io/reflect-metadata/#ordinarydefineownmetadata
    function OrdinaryDefineOwnMetadata(MetadataKey, MetadataValue, O, P) {
        var metadataMap = GetOrCreateMetadataMap(O, P, /*Create*/ true);
        metadataMap.set(MetadataKey, MetadataValue);
    }
    // 3.1.6.1 OrdinaryMetadataKeys(O, P)
    // https://rbuckton.github.io/reflect-metadata/#ordinarymetadatakeys
    function OrdinaryMetadataKeys(O, P) {
        var ownKeys = OrdinaryOwnMetadataKeys(O, P);
        var parent = OrdinaryGetPrototypeOf(O);
        if (parent === null)
            return ownKeys;
        var parentKeys = OrdinaryMetadataKeys(parent, P);
        if (parentKeys.length <= 0)
            return ownKeys;
        if (ownKeys.length <= 0)
            return parentKeys;
        var set = new _Set();
        var keys = [];
        for (var _i = 0, ownKeys_1 = ownKeys; _i < ownKeys_1.length; _i++) {
            var key = ownKeys_1[_i];
            var hasKey = set.has(key);
            if (!hasKey) {
                set.add(key);
                keys.push(key);
            }
        }
        for (var _a = 0, parentKeys_1 = parentKeys; _a < parentKeys_1.length; _a++) {
            var key = parentKeys_1[_a];
            var hasKey = set.has(key);
            if (!hasKey) {
                set.add(key);
                keys.push(key);
            }
        }
        return keys;
    }
    // 3.1.7.1 OrdinaryOwnMetadataKeys(O, P)
    // https://rbuckton.github.io/reflect-metadata/#ordinaryownmetadatakeys
    function OrdinaryOwnMetadataKeys(O, P) {
        var keys = [];
        var metadataMap = GetOrCreateMetadataMap(O, P, /*Create*/ false);
        if (IsUndefined(metadataMap))
            return keys;
        var keysObj = metadataMap.keys();
        var iterator = GetIterator(keysObj);
        var k = 0;
        while (true) {
            var next = IteratorStep(iterator);
            if (!next) {
                keys.length = k;
                return keys;
            }
            var nextValue = IteratorValue(next);
            try {
                keys[k] = nextValue;
            }
            catch (e) {
                try {
                    IteratorClose(iterator);
                }
                finally {
                    throw e;
                }
            }
            k++;
        }
    }
    // 6 ECMAScript Data Typ0es and Values
    // https://tc39.github.io/ecma262/#sec-ecmascript-data-types-and-values
    function Type(x) {
        if (x === null)
            return 1 /* Null */;
        switch (typeof x) {
            case "undefined": return 0 /* Undefined */;
            case "boolean": return 2 /* Boolean */;
            case "string": return 3 /* String */;
            case "symbol": return 4 /* Symbol */;
            case "number": return 5 /* Number */;
            case "object": return x === null ? 1 /* Null */ : 6 /* Object */;
            default: return 6 /* Object */;
        }
    }
    // 6.1.1 The Undefined Type
    // https://tc39.github.io/ecma262/#sec-ecmascript-language-types-undefined-type
    function IsUndefined(x) {
        return x === undefined;
    }
    // 6.1.2 The Null Type
    // https://tc39.github.io/ecma262/#sec-ecmascript-language-types-null-type
    function IsNull(x) {
        return x === null;
    }
    // 6.1.5 The Symbol Type
    // https://tc39.github.io/ecma262/#sec-ecmascript-language-types-symbol-type
    function IsSymbol(x) {
        return typeof x === "symbol";
    }
    // 6.1.7 The Object Type
    // https://tc39.github.io/ecma262/#sec-object-type
    function IsObject(x) {
        return typeof x === "object" ? x !== null : typeof x === "function";
    }
    // 7.1 Type Conversion
    // https://tc39.github.io/ecma262/#sec-type-conversion
    // 7.1.1 ToPrimitive(input [, PreferredType])
    // https://tc39.github.io/ecma262/#sec-toprimitive
    function ToPrimitive(input, PreferredType) {
        switch (Type(input)) {
            case 0 /* Undefined */: return input;
            case 1 /* Null */: return input;
            case 2 /* Boolean */: return input;
            case 3 /* String */: return input;
            case 4 /* Symbol */: return input;
            case 5 /* Number */: return input;
        }
        var hint = PreferredType === 3 /* String */ ? "string" : PreferredType === 5 /* Number */ ? "number" : "default";
        var exoticToPrim = GetMethod(input, toPrimitiveSymbol);
        if (exoticToPrim !== undefined) {
            var result = exoticToPrim.call(input, hint);
            if (IsObject(result))
                throw new TypeError();
            return result;
        }
        return OrdinaryToPrimitive(input, hint === "default" ? "number" : hint);
    }
    // 7.1.1.1 OrdinaryToPrimitive(O, hint)
    // https://tc39.github.io/ecma262/#sec-ordinarytoprimitive
    function OrdinaryToPrimitive(O, hint) {
        if (hint === "string") {
            var toString_1 = O.toString;
            if (IsCallable(toString_1)) {
                var result = toString_1.call(O);
                if (!IsObject(result))
                    return result;
            }
            var valueOf = O.valueOf;
            if (IsCallable(valueOf)) {
                var result = valueOf.call(O);
                if (!IsObject(result))
                    return result;
            }
        }
        else {
            var valueOf = O.valueOf;
            if (IsCallable(valueOf)) {
                var result = valueOf.call(O);
                if (!IsObject(result))
                    return result;
            }
            var toString_2 = O.toString;
            if (IsCallable(toString_2)) {
                var result = toString_2.call(O);
                if (!IsObject(result))
                    return result;
            }
        }
        throw new TypeError();
    }
    // 7.1.2 ToBoolean(argument)
    // https://tc39.github.io/ecma262/2016/#sec-toboolean
    function ToBoolean(argument) {
        return !!argument;
    }
    // 7.1.12 ToString(argument)
    // https://tc39.github.io/ecma262/#sec-tostring
    function ToString(argument) {
        return "" + argument;
    }
    // 7.1.14 ToPropertyKey(argument)
    // https://tc39.github.io/ecma262/#sec-topropertykey
    function ToPropertyKey(argument) {
        var key = ToPrimitive(argument, 3 /* String */);
        if (IsSymbol(key))
            return key;
        return ToString(key);
    }
    // 7.2 Testing and Comparison Operations
    // https://tc39.github.io/ecma262/#sec-testing-and-comparison-operations
    // 7.2.2 IsArray(argument)
    // https://tc39.github.io/ecma262/#sec-isarray
    function IsArray(argument) {
        return Array.isArray
            ? Array.isArray(argument)
            : argument instanceof Object
                ? argument instanceof Array
                : Object.prototype.toString.call(argument) === "[object Array]";
    }
    // 7.2.3 IsCallable(argument)
    // https://tc39.github.io/ecma262/#sec-iscallable
    function IsCallable(argument) {
        // NOTE: This is an approximation as we cannot check for [[Call]] internal method.
        return typeof argument === "function";
    }
    // 7.2.4 IsConstructor(argument)
    // https://tc39.github.io/ecma262/#sec-isconstructor
    function IsConstructor(argument) {
        // NOTE: This is an approximation as we cannot check for [[Construct]] internal method.
        return typeof argument === "function";
    }
    // 7.2.7 IsPropertyKey(argument)
    // https://tc39.github.io/ecma262/#sec-ispropertykey
    function IsPropertyKey(argument) {
        switch (Type(argument)) {
            case 3 /* String */: return true;
            case 4 /* Symbol */: return true;
            default: return false;
        }
    }
    // 7.3 Operations on Objects
    // https://tc39.github.io/ecma262/#sec-operations-on-objects
    // 7.3.9 GetMethod(V, P)
    // https://tc39.github.io/ecma262/#sec-getmethod
    function GetMethod(V, P) {
        var func = V[P];
        if (func === undefined || func === null)
            return undefined;
        if (!IsCallable(func))
            throw new TypeError();
        return func;
    }
    // 7.4 Operations on Iterator Objects
    // https://tc39.github.io/ecma262/#sec-operations-on-iterator-objects
    function GetIterator(obj) {
        var method = GetMethod(obj, iteratorSymbol);
        if (!IsCallable(method))
            throw new TypeError(); // from Call
        var iterator = method.call(obj);
        if (!IsObject(iterator))
            throw new TypeError();
        return iterator;
    }
    // 7.4.4 IteratorValue(iterResult)
    // https://tc39.github.io/ecma262/2016/#sec-iteratorvalue
    function IteratorValue(iterResult) {
        return iterResult.value;
    }
    // 7.4.5 IteratorStep(iterator)
    // https://tc39.github.io/ecma262/#sec-iteratorstep
    function IteratorStep(iterator) {
        var result = iterator.next();
        return result.done ? false : result;
    }
    // 7.4.6 IteratorClose(iterator, completion)
    // https://tc39.github.io/ecma262/#sec-iteratorclose
    function IteratorClose(iterator) {
        var f = iterator["return"];
        if (f)
            f.call(iterator);
    }
    // 9.1 Ordinary Object Internal Methods and Internal Slots
    // https://tc39.github.io/ecma262/#sec-ordinary-object-internal-methods-and-internal-slots
    // 9.1.1.1 OrdinaryGetPrototypeOf(O)
    // https://tc39.github.io/ecma262/#sec-ordinarygetprototypeof
    function OrdinaryGetPrototypeOf(O) {
        var proto = Object.getPrototypeOf(O);
        if (typeof O !== "function" || O === functionPrototype)
            return proto;
        // TypeScript doesn't set __proto__ in ES5, as it's non-standard.
        // Try to determine the superclass constructor. Compatible implementations
        // must either set __proto__ on a subclass constructor to the superclass constructor,
        // or ensure each class has a valid `constructor` property on its prototype that
        // points back to the constructor.
        // If this is not the same as Function.[[Prototype]], then this is definately inherited.
        // This is the case when in ES6 or when using __proto__ in a compatible browser.
        if (proto !== functionPrototype)
            return proto;
        // If the super prototype is Object.prototype, null, or undefined, then we cannot determine the heritage.
        var prototype = O.prototype;
        var prototypeProto = prototype && Object.getPrototypeOf(prototype);
        if (prototypeProto == null || prototypeProto === Object.prototype)
            return proto;
        // If the constructor was not a function, then we cannot determine the heritage.
        var constructor = prototypeProto.constructor;
        if (typeof constructor !== "function")
            return proto;
        // If we have some kind of self-reference, then we cannot determine the heritage.
        if (constructor === O)
            return proto;
        // we have a pretty good guess at the heritage.
        return constructor;
    }
    // naive Map shim
    function CreateMapPolyfill() {
        var cacheSentinel = {};
        var arraySentinel = [];
        var MapIterator = (function () {
            function MapIterator(keys, values, selector) {
                this._index = 0;
                this._keys = keys;
                this._values = values;
                this._selector = selector;
            }
            MapIterator.prototype["@@iterator"] = function () { return this; };
            MapIterator.prototype[iteratorSymbol] = function () { return this; };
            MapIterator.prototype.next = function () {
                var index = this._index;
                if (index >= 0 && index < this._keys.length) {
                    var result = this._selector(this._keys[index], this._values[index]);
                    if (index + 1 >= this._keys.length) {
                        this._index = -1;
                        this._keys = arraySentinel;
                        this._values = arraySentinel;
                    }
                    else {
                        this._index++;
                    }
                    return { value: result, done: false };
                }
                return { value: undefined, done: true };
            };
            MapIterator.prototype.throw = function (error) {
                if (this._index >= 0) {
                    this._index = -1;
                    this._keys = arraySentinel;
                    this._values = arraySentinel;
                }
                throw error;
            };
            MapIterator.prototype.return = function (value) {
                if (this._index >= 0) {
                    this._index = -1;
                    this._keys = arraySentinel;
                    this._values = arraySentinel;
                }
                return { value: value, done: true };
            };
            return MapIterator;
        }());
        return (function () {
            function Map() {
                this._keys = [];
                this._values = [];
                this._cacheKey = cacheSentinel;
                this._cacheIndex = -2;
            }
            Object.defineProperty(Map.prototype, "size", {
                get: function () { return this._keys.length; },
                enumerable: true,
                configurable: true
            });
            Map.prototype.has = function (key) { return this._find(key, /*insert*/ false) >= 0; };
            Map.prototype.get = function (key) {
                var index = this._find(key, /*insert*/ false);
                return index >= 0 ? this._values[index] : undefined;
            };
            Map.prototype.set = function (key, value) {
                var index = this._find(key, /*insert*/ true);
                this._values[index] = value;
                return this;
            };
            Map.prototype.delete = function (key) {
                var index = this._find(key, /*insert*/ false);
                if (index >= 0) {
                    var size = this._keys.length;
                    for (var i = index + 1; i < size; i++) {
                        this._keys[i - 1] = this._keys[i];
                        this._values[i - 1] = this._values[i];
                    }
                    this._keys.length--;
                    this._values.length--;
                    if (key === this._cacheKey) {
                        this._cacheKey = cacheSentinel;
                        this._cacheIndex = -2;
                    }
                    return true;
                }
                return false;
            };
            Map.prototype.clear = function () {
                this._keys.length = 0;
                this._values.length = 0;
                this._cacheKey = cacheSentinel;
                this._cacheIndex = -2;
            };
            Map.prototype.keys = function () { return new MapIterator(this._keys, this._values, getKey); };
            Map.prototype.values = function () { return new MapIterator(this._keys, this._values, getValue); };
            Map.prototype.entries = function () { return new MapIterator(this._keys, this._values, getEntry); };
            Map.prototype["@@iterator"] = function () { return this.entries(); };
            Map.prototype[iteratorSymbol] = function () { return this.entries(); };
            Map.prototype._find = function (key, insert) {
                if (this._cacheKey !== key) {
                    this._cacheIndex = this._keys.indexOf(this._cacheKey = key);
                }
                if (this._cacheIndex < 0 && insert) {
                    this._cacheIndex = this._keys.length;
                    this._keys.push(key);
                    this._values.push(undefined);
                }
                return this._cacheIndex;
            };
            return Map;
        }());
        function getKey(key, _) {
            return key;
        }
        function getValue(_, value) {
            return value;
        }
        function getEntry(key, value) {
            return [key, value];
        }
    }
    // naive Set shim
    function CreateSetPolyfill() {
        return (function () {
            function Set() {
                this._map = new _Map();
            }
            Object.defineProperty(Set.prototype, "size", {
                get: function () { return this._map.size; },
                enumerable: true,
                configurable: true
            });
            Set.prototype.has = function (value) { return this._map.has(value); };
            Set.prototype.add = function (value) { return this._map.set(value, value), this; };
            Set.prototype.delete = function (value) { return this._map.delete(value); };
            Set.prototype.clear = function () { this._map.clear(); };
            Set.prototype.keys = function () { return this._map.keys(); };
            Set.prototype.values = function () { return this._map.values(); };
            Set.prototype.entries = function () { return this._map.entries(); };
            Set.prototype["@@iterator"] = function () { return this.keys(); };
            Set.prototype[iteratorSymbol] = function () { return this.keys(); };
            return Set;
        }());
    }
    // naive WeakMap shim
    function CreateWeakMapPolyfill() {
        var UUID_SIZE = 16;
        var keys = HashMap.create();
        var rootKey = CreateUniqueKey();
        return (function () {
            function WeakMap() {
                this._key = CreateUniqueKey();
            }
            WeakMap.prototype.has = function (target) {
                var table = GetOrCreateWeakMapTable(target, /*create*/ false);
                return table !== undefined ? HashMap.has(table, this._key) : false;
            };
            WeakMap.prototype.get = function (target) {
                var table = GetOrCreateWeakMapTable(target, /*create*/ false);
                return table !== undefined ? HashMap.get(table, this._key) : undefined;
            };
            WeakMap.prototype.set = function (target, value) {
                var table = GetOrCreateWeakMapTable(target, /*create*/ true);
                table[this._key] = value;
                return this;
            };
            WeakMap.prototype.delete = function (target) {
                var table = GetOrCreateWeakMapTable(target, /*create*/ false);
                return table !== undefined ? delete table[this._key] : false;
            };
            WeakMap.prototype.clear = function () {
                // NOTE: not a real clear, just makes the previous data unreachable
                this._key = CreateUniqueKey();
            };
            return WeakMap;
        }());
        function CreateUniqueKey() {
            var key;
            do
                key = "@@WeakMap@@" + CreateUUID();
            while (HashMap.has(keys, key));
            keys[key] = true;
            return key;
        }
        function GetOrCreateWeakMapTable(target, create) {
            if (!hasOwn.call(target, rootKey)) {
                if (!create)
                    return undefined;
                Object.defineProperty(target, rootKey, { value: HashMap.create() });
            }
            return target[rootKey];
        }
        function FillRandomBytes(buffer, size) {
            for (var i = 0; i < size; ++i)
                buffer[i] = Math.random() * 0xff | 0;
            return buffer;
        }
        function GenRandomBytes(size) {
            if (typeof Uint8Array === "function") {
                if (typeof crypto !== "undefined")
                    return crypto.getRandomValues(new Uint8Array(size));
                if (typeof msCrypto !== "undefined")
                    return msCrypto.getRandomValues(new Uint8Array(size));
                return FillRandomBytes(new Uint8Array(size), size);
            }
            return FillRandomBytes(new Array(size), size);
        }
        function CreateUUID() {
            var data = GenRandomBytes(UUID_SIZE);
            // mark as random - RFC 4122 § 4.4
            data[6] = data[6] & 0x4f | 0x40;
            data[8] = data[8] & 0xbf | 0x80;
            var result = "";
            for (var offset = 0; offset < UUID_SIZE; ++offset) {
                var byte = data[offset];
                if (offset === 4 || offset === 6 || offset === 8)
                    result += "-";
                if (byte < 16)
                    result += "0";
                result += byte.toString(16).toLowerCase();
            }
            return result;
        }
    }
    // uses a heuristic used by v8 and chakra to force an object into dictionary mode.
    function MakeDictionary(obj) {
        obj.__ = undefined;
        delete obj.__;
        return obj;
    }
    // patch global Reflect
    (function (__global) {
        if (typeof __global.Reflect !== "undefined") {
            if (__global.Reflect !== Reflect) {
                for (var p in Reflect) {
                    if (hasOwn.call(Reflect, p)) {
                        __global.Reflect[p] = Reflect[p];
                    }
                }
            }
        }
        else {
            __global.Reflect = Reflect;
        }
    })(typeof global !== "undefined" ? global :
        typeof self !== "undefined" ? self :
            Function("return this;")());
})(Reflect || (Reflect = {}));
//# sourceMappingURL=Reflect.js.map
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(94), __webpack_require__(45)))

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ArrayUtility_1 = __webpack_require__(5);
var Pool = (function () {
    function Pool(type, max) {
        if (max === void 0) { max = Infinity; }
        this.type = type;
        this.max = max;
        this._actives = [];
        this._inactives = [];
    }
    Object.defineProperty(Pool.prototype, "actives", {
        get: function () { return this._actives; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Pool.prototype, "inactives", {
        get: function () { return this._inactives; },
        enumerable: true,
        configurable: true
    });
    Pool.prototype.get = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (this._inactives.length === 0) {
            this.recycle();
        }
        var instance = this._inactives.shift();
        if (!instance) {
            if (this._actives.length < this.max) {
                instance = new ((_a = this.type).bind.apply(_a, [void 0].concat(args)))();
                this._actives.push(instance);
                ArrayUtility_1.addToArray(this._actives, instance);
            }
        }
        return instance;
        var _a;
    };
    Pool.prototype.put = function (instance) {
        if (ArrayUtility_1.removeFromArray(this._actives, instance)) {
            instance.destroy();
        }
    };
    Pool.prototype.recycle = function () {
        for (var i = this._actives.length - 1; i >= 0; i--) {
            if (this._actives[i].canRecycle) {
                var item = this._actives[i];
                this._actives.splice(i, 1);
                this._inactives.push(item);
            }
        }
    };
    return Pool;
}());
exports.Pool = Pool;


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * An error thrown when an action is invalid because the object has been
 * unsubscribed.
 *
 * @see {@link Subject}
 * @see {@link BehaviorSubject}
 *
 * @class ObjectUnsubscribedError
 */
var ObjectUnsubscribedError = (function (_super) {
    __extends(ObjectUnsubscribedError, _super);
    function ObjectUnsubscribedError() {
        var err = _super.call(this, 'object unsubscribed');
        this.name = err.name = 'ObjectUnsubscribedError';
        this.stack = err.stack;
        this.message = err.message;
    }
    return ObjectUnsubscribedError;
}(Error));
exports.ObjectUnsubscribedError = ObjectUnsubscribedError;
//# sourceMappingURL=ObjectUnsubscribedError.js.map

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.MouseInput = Symbol('MouseInput');


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.TouchInput = Symbol('TouchInput');


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var Observable_1 = __webpack_require__(3);
function onceEvent(node, eventName) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2, new Promise(function (resolve, reject) {
                    var onEvent = function (e) {
                        resolve(e);
                        teardown();
                    };
                    var onError = function (e) {
                        reject(e);
                        teardown();
                    };
                    var teardown = function () {
                        node.removeEventListener(eventName, onEvent);
                        node.removeEventListener('error', onError);
                    };
                    node.addEventListener(eventName, onEvent);
                    node.addEventListener('error', onError);
                })];
        });
    });
}
exports.onceEvent = onceEvent;
function observeEvent(node, eventName) {
    return new Observable_1.Observable(function (subscriber) {
        node.addEventListener(eventName, function (e) { return subscriber.next(e); });
        var parentNode = node.parentNode;
        if (parentNode) {
            var observer = new MutationObserver(function (records) {
                var shouldComplete = records
                    .reduce(function (prev, curr) { return prev.concat(listToArray(curr.removedNodes)); }, [])
                    .some(function (removeedNode) { return removeedNode === node; });
                if (shouldComplete) {
                    subscriber.complete();
                }
            });
            observer.observe(parentNode, { childList: true });
        }
    });
}
exports.observeEvent = observeEvent;
function listToArray(list) {
    return Array.prototype.slice.call(list);
}
exports.listToArray = listToArray;


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.RenderProcess = Symbol('RenderProcess');


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Vector_1 = __webpack_require__(1);
var Matrix = (function () {
    function Matrix(value) {
        this._value = [
            [1, 0, 0],
            [0, 1, 0]
        ];
        this._save = [];
        if (value !== void 0) {
            for (var i = 0; i < 2; i++) {
                for (var j = 0; j < 3; j++) {
                    this._value[i][j] = value[i][j] || this._value[i][j];
                }
            }
        }
        this.save();
    }
    Object.defineProperty(Matrix.prototype, 0, {
        get: function () { return this._value[0]; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Matrix.prototype, 1, {
        get: function () { return this._value[1]; },
        enumerable: true,
        configurable: true
    });
    Matrix.prototype.save = function () {
        this._save.push([
            [this[0][0], this[0][1], this[0][2]],
            [this[1][0], this[1][1], this[1][2]]
        ]);
        return this;
    };
    Matrix.prototype.restore = function () {
        var last = this._save.pop();
        if (last) {
            this._value = last;
        }
        else {
            this.reset();
        }
        return this;
    };
    Matrix.prototype.reset = function () {
        this._save = [];
        this._value = [
            [1, 0, 0],
            [0, 1, 0]
        ];
        return this;
    };
    Matrix.prototype.setRotatation = function (radian) {
        var rotation = new Matrix([
            [Math.cos(radian), -Math.sin(radian)],
            [Math.sin(radian), Math.cos(radian)]
        ]);
        return this.multiply(rotation);
    };
    Matrix.prototype.setTranslation = function (positionOrX, y) {
        var translation;
        if (positionOrX instanceof Vector_1.Vector) {
            translation = new Matrix([
                [1, 0, positionOrX.x],
                [0, 1, positionOrX.y]
            ]);
        }
        else if (y !== void 0) {
            translation = new Matrix([
                [1, 0, positionOrX],
                [0, 1, y]
            ]);
        }
        else {
            return this;
        }
        return this.multiply(translation);
    };
    Matrix.prototype.setScaling = function (magnificationOrX, y) {
        var scaling;
        if (magnificationOrX instanceof Vector_1.Vector) {
            scaling = new Matrix([
                [magnificationOrX.x, 0],
                [0, magnificationOrX.y]
            ]);
        }
        else if (y !== void 0) {
            scaling = new Matrix([
                [magnificationOrX, 0],
                [0, y]
            ]);
        }
        else {
            return this;
        }
        return this.multiply(scaling);
    };
    Matrix.prototype.multiply = function (other) {
        var a1 = this[0][0];
        var b1 = this[0][1];
        var c1 = this[0][2];
        var d1 = this[1][0];
        var e1 = this[1][1];
        var f1 = this[1][2];
        var a2 = other[0][0];
        var b2 = other[0][1];
        var c2 = other[0][2];
        var d2 = other[1][0];
        var e2 = other[1][1];
        var f2 = other[1][2];
        this[0][0] = a1 * a2 + b1 * d2;
        this[0][1] = a1 * b2 + b1 * e2;
        this[0][2] = a1 * c2 + b1 * f2 + c1;
        this[1][0] = d1 * a2 + e1 * d2;
        this[1][1] = d1 * b2 + e1 * e2;
        this[1][2] = d1 * c2 + e1 * f2 + f1;
        return this;
    };
    Matrix.prototype.multiplyToPoint = function (point) {
        var x = point.x;
        var y = point.y;
        point.setTo(this[0][0] * x + this[0][1] * y + this[0][2] * 1, this[1][0] * x + this[1][1] * y + this[1][2] * 1);
        return this;
    };
    Matrix.prototype.multiplyToVector = function (vector) {
        var x = vector.x;
        var y = vector.y;
        vector.setTo(this[0][0] * x + this[0][1] * y + 0 * 0, this[1][0] * x + this[1][1] * y + 0 * 0);
        return this;
    };
    Matrix.prototype.equalTo = function (another) {
        return this[0][0] === another[0][0] &&
            this[0][1] === another[0][1] &&
            this[0][2] === another[0][2] &&
            this[1][0] === another[1][0] &&
            this[1][1] === another[1][1] &&
            this[1][2] === another[1][2];
    };
    Matrix.prototype.invertFrom = function (source) {
        var a_minor = source[1][1] * 1 - source[1][2] * 0;
        var b_minor = source[1][0] * 1 - source[1][2] * 0;
        var c_minor = source[1][0] * 0 - source[1][1] * 0;
        var d_minor = source[0][1] * 1 - source[0][2] * 0;
        var e_minor = source[0][0] * 1 - source[0][2] * 0;
        var g_minor = source[0][1] * source[1][2] - source[0][2] * source[1][1];
        var h_minor = source[0][0] * source[1][2] - source[0][2] * source[1][0];
        var inverseDeterminant = 1 / (source[0][0] * a_minor - source[0][1] * b_minor + source[0][2] * c_minor);
        this[0][0] = inverseDeterminant * a_minor;
        this[0][1] = inverseDeterminant * -d_minor;
        this[0][2] = inverseDeterminant * g_minor;
        this[1][0] = inverseDeterminant * -b_minor;
        this[1][1] = inverseDeterminant * e_minor;
        this[1][2] = inverseDeterminant * -h_minor;
        return this;
    };
    Matrix.prototype.getInverse = function () {
        return new Matrix().invertFrom(this);
    };
    Matrix.prototype.clone = function () {
        return new Matrix(this._value);
    };
    Matrix.prototype.toString = function () {
        var matrixString = this._value
            .map(function (row) { return row.join(','); })
            .reduce(function (prev, curr) { return prev += "[" + curr + "]"; }, '');
        return "Matrix " + matrixString;
    };
    Matrix.Identity = new Matrix();
    return Matrix;
}());
exports.Matrix = Matrix;


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ArrayUtility_1 = __webpack_require__(5);
var ReadonlyTree = (function () {
    function ReadonlyTree(data, _children) {
        if (_children === void 0) { _children = []; }
        this.data = data;
        this._children = _children;
        this._parent = null;
    }
    Object.defineProperty(ReadonlyTree.prototype, "parent", {
        get: function () { return this._parent; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ReadonlyTree.prototype, "isRoot", {
        get: function () { return !this._parent; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ReadonlyTree.prototype, "isLeaf", {
        get: function () { return this._children.length === 0; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ReadonlyTree.prototype, "length", {
        get: function () { return this._children.length; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ReadonlyTree.prototype, "children", {
        get: function () { return this._children; },
        enumerable: true,
        configurable: true
    });
    ReadonlyTree.prototype.hasChild = function (child) {
        var stack = this._children.slice();
        var current = stack.pop();
        while (current) {
            for (var i = current.children.length - 1; i > -1; i--) {
                stack.push(current.children[i]);
            }
            if (current === child) {
                return true;
            }
            current = stack.pop();
        }
        return false;
    };
    ReadonlyTree.prototype.forEachChildren = function (callback) {
        var stack = this._children.slice();
        var current = stack.pop();
        while (current) {
            for (var i = current.children.length - 1; i > -1; i--) {
                stack.push(current.children[i]);
            }
            callback(current.data);
            current = stack.pop();
        }
    };
    ReadonlyTree.prototype.findParent = function (condition) {
        var parent = this.parent;
        while (parent) {
            if (condition(parent.data)) {
                return parent.data;
            }
            else {
                parent = parent.parent;
            }
        }
        return null;
    };
    return ReadonlyTree;
}());
exports.ReadonlyTree = ReadonlyTree;
var Tree = (function (_super) {
    __extends(Tree, _super);
    function Tree() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Tree.prototype.add = function (child) {
        child._parent = this;
        return ArrayUtility_1.addToArray(this._children, child);
    };
    Tree.prototype.remove = function (child) {
        child._parent = null;
        return ArrayUtility_1.removeFromArray(this._children, child);
    };
    Tree.prototype.hide = function () {
        if (!this.parent) {
            return false;
        }
        return ArrayUtility_1.removeFromArray(this.parent._children, this);
    };
    Tree.prototype.show = function () {
        if (!this.parent) {
            return false;
        }
        return ArrayUtility_1.addToArray(this.parent._children, this);
    };
    return Tree;
}(ReadonlyTree));
exports.Tree = Tree;


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Vector_1 = __webpack_require__(1);
var Ray = (function () {
    function Ray(origin, direction) {
        if (origin === void 0) { origin = new Vector_1.Vector(); }
        if (direction === void 0) { direction = new Vector_1.Vector(); }
        this.origin = origin;
        this.direction = direction;
        this.direction.normalize();
    }
    Ray.prototype.getPoint = function (distance) {
        return this.direction.clone().multiply(distance).add(this.origin);
    };
    Ray.prototype.intersect = function (another) {
        var p = this.origin;
        var r = this.direction;
        var q;
        var s;
        var l = 0;
        if (another instanceof Ray) {
            q = another.origin;
            s = another.direction;
        }
        else {
            q = another.begin;
            s = another.getDirection();
            l = another.length;
        }
        var pq = q.clone().subtract(p);
        var r_x_s = r.cross(s);
        var pq_x_r = pq.cross(r);
        if (r_x_s === 0) {
            return -1;
        }
        else {
            var t = pq.cross(s) / r_x_s;
            var u = pq_x_r / r_x_s;
            if (l && u > l) {
                return -1;
            }
            if (u >= 0 && t >= 0) {
                return t;
            }
        }
        return -1;
    };
    return Ray;
}());
exports.Ray = Ray;


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.NarrowPhaseCollisionResolver = Symbol('NarrowPhaseCollisionResolver');


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var BehaviorSubject_1 = __webpack_require__(113);
var Resource = (function () {
    function Resource() {
        this._isLoaded = new BehaviorSubject_1.BehaviorSubject(false);
    }
    Object.defineProperty(Resource.prototype, "isLoaded", {
        get: function () { return this._isLoaded.value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Resource.prototype, "isLoaded$", {
        get: function () {
            return this._isLoaded.asObservable()
                .filter(function (isLoad) { return isLoad; })
                .map(function () { return void 0; });
        },
        enumerable: true,
        configurable: true
    });
    Resource.prototype.destroy = function () {
        this._isLoaded.complete();
    };
    return Resource;
}());
exports.Resource = Resource;


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var GameObject_1 = __webpack_require__(6);
var Screen_1 = __webpack_require__(19);
var GameObjectInitializer_1 = __webpack_require__(28);
var Color_1 = __webpack_require__(7);
var Bounds_1 = __webpack_require__(29);
var Rect_1 = __webpack_require__(64);
var Matrix_1 = __webpack_require__(58);
var Type_1 = __webpack_require__(14);
var BrowserDelegate_1 = __webpack_require__(4);
var Service_1 = __webpack_require__(2);
var Inject_1 = __webpack_require__(0);
exports.MainCamera = Symbol('MainCamera');
var Camera = (function (_super) {
    __extends(Camera, _super);
    function Camera(browser, screen, gameObjectInitializer) {
        var _this = _super.call(this, gameObjectInitializer) || this;
        _this.aspect = 16 / 9;
        _this.backgroundColor = Color_1.Color.Black;
        _this.toWorldMatrix = new Matrix_1.Matrix();
        _this.toScreenMatrix = new Matrix_1.Matrix();
        _this.cullingMask = Type_1.AllBuiltInLayer;
        _this.eventMask = Type_1.AllBuiltInLayer;
        _this.rect = new Rect_1.Rect();
        _this.bounds = new Bounds_1.Bounds();
        _this.setSize(screen.width, screen.height);
        return _this;
    }
    Camera.prototype.setSize = function (width, height) {
        this.toScreenMatrix.reset();
        this.rect.width = width;
        this.rect.height = height;
        var halfWidth = width * 0.5;
        var halfHeight = height * 0.5;
        this.toScreenMatrix.setTranslation(halfWidth, halfHeight);
        this.toScreenMatrix.setScaling(0, -1);
        this.bounds.extents.setTo(halfWidth, halfHeight);
    };
    Camera.prototype.update = function () {
        _super.prototype.update.call(this);
        this.toScreenMatrix.save();
        this.toScreenMatrix.setTranslation(-this.transform.position.x, -this.transform.position.y);
        this.toScreenMatrix.setRotatation(this.transform.rotation);
        this.toScreenMatrix.setScaling(this.transform.scale);
        this.toWorldMatrix.invertFrom(this.toScreenMatrix);
        this.bounds.center.copy(this.transform.position);
    };
    Camera.prototype.postRender = function () {
        _super.prototype.postRender.call(this);
        this.toScreenMatrix.restore();
    };
    Camera.prototype.screenToWorld = function (point) {
        var result = point.clone();
        this.toWorldMatrix.multiplyToPoint(result);
        return result;
    };
    Camera.prototype.worldToScreen = function (point) {
        var result = point.clone();
        this.toScreenMatrix.multiplyToPoint(result);
        return result;
    };
    Camera = __decorate([
        Service_1.Service(exports.MainCamera),
        __param(0, Inject_1.Inject(BrowserDelegate_1.BrowserDelegate)),
        __param(1, Inject_1.Inject(Screen_1.Screen)),
        __param(2, Inject_1.Inject(GameObjectInitializer_1.GameObjectInitializer)),
        __metadata("design:paramtypes", [Object, Object, Object])
    ], Camera);
    return Camera;
}(GameObject_1.GameObject));
exports.Camera = Camera;


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Vector_1 = __webpack_require__(1);
var Rect = (function () {
    function Rect(position, width, height) {
        if (position === void 0) { position = new Vector_1.Vector(); }
        if (width === void 0) { width = 0; }
        if (height === void 0) { height = 0; }
        this.position = position;
        this.width = width;
        this.height = height;
    }
    Object.defineProperty(Rect.prototype, "center", {
        get: function () {
            return new Vector_1.Vector(this.position.x + this.width / 2, this.position.y + this.height / 2);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rect.prototype, "xMin", {
        get: function () { return this.position.x; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rect.prototype, "xMax", {
        get: function () { return this.position.x + this.width; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rect.prototype, "yMin", {
        get: function () { return this.position.y; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rect.prototype, "yMax", {
        get: function () { return this.position.y + this.height; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rect.prototype, "min", {
        get: function () {
            return new Vector_1.Vector(this.xMin, this.yMin);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rect.prototype, "max", {
        get: function () {
            return new Vector_1.Vector(this.xMax, this.yMax);
        },
        enumerable: true,
        configurable: true
    });
    Rect.prototype.contains = function (point) {
        if (point.x < this.position.x) {
            return false;
        }
        if (point.y < this.position.y) {
            return false;
        }
        if (point.x > this.position.x + this.width) {
            return false;
        }
        if (point.y > this.position.y + this.height) {
            return false;
        }
        return true;
    };
    Rect.prototype.overlap = function (another) {
        if (this.xMax < another.xMin || this.xMin > another.xMax) {
            return false;
        }
        if (this.yMax < another.yMin || this.yMin > another.yMax) {
            return false;
        }
        return true;
    };
    return Rect;
}());
exports.Rect = Rect;


/***/ }),
/* 65 */,
/* 66 */,
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(71);
__webpack_require__(87);
__webpack_require__(90);
__webpack_require__(92);
__webpack_require__(51);


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Observable_1 = __webpack_require__(3);
var merge_1 = __webpack_require__(75);
Observable_1.Observable.merge = merge_1.merge;
//# sourceMappingURL=merge.js.map

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Subscriber_1 = __webpack_require__(13);
var rxSubscriber_1 = __webpack_require__(36);
var Observer_1 = __webpack_require__(48);
function toSubscriber(nextOrObserver, error, complete) {
    if (nextOrObserver) {
        if (nextOrObserver instanceof Subscriber_1.Subscriber) {
            return nextOrObserver;
        }
        if (nextOrObserver[rxSubscriber_1.rxSubscriber]) {
            return nextOrObserver[rxSubscriber_1.rxSubscriber]();
        }
    }
    if (!nextOrObserver && !error && !complete) {
        return new Subscriber_1.Subscriber(Observer_1.empty);
    }
    return new Subscriber_1.Subscriber(nextOrObserver, error, complete);
}
exports.toSubscriber = toSubscriber;
//# sourceMappingURL=toSubscriber.js.map

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.isArray = Array.isArray || (function (x) { return x && typeof x.length === 'number'; });
//# sourceMappingURL=isArray.js.map

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * An error thrown when one or more errors have occurred during the
 * `unsubscribe` of a {@link Subscription}.
 */
var UnsubscriptionError = (function (_super) {
    __extends(UnsubscriptionError, _super);
    function UnsubscriptionError(errors) {
        _super.call(this);
        this.errors = errors;
        var err = Error.call(this, errors ?
            errors.length + " errors occurred during unsubscription:\n  " + errors.map(function (err, i) { return ((i + 1) + ") " + err.toString()); }).join('\n  ') : '');
        this.name = err.name = 'UnsubscriptionError';
        this.stack = err.stack;
        this.message = err.message;
    }
    return UnsubscriptionError;
}(Error));
exports.UnsubscriptionError = UnsubscriptionError;
//# sourceMappingURL=UnsubscriptionError.js.map

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var merge_1 = __webpack_require__(76);
exports.merge = merge_1.mergeStatic;
//# sourceMappingURL=merge.js.map

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Observable_1 = __webpack_require__(3);
var ArrayObservable_1 = __webpack_require__(77);
var mergeAll_1 = __webpack_require__(80);
var isScheduler_1 = __webpack_require__(50);
/* tslint:enable:max-line-length */
/**
 * Creates an output Observable which concurrently emits all values from every
 * given input Observable.
 *
 * <span class="informal">Flattens multiple Observables together by blending
 * their values into one Observable.</span>
 *
 * <img src="./img/merge.png" width="100%">
 *
 * `merge` subscribes to each given input Observable (either the source or an
 * Observable given as argument), and simply forwards (without doing any
 * transformation) all the values from all the input Observables to the output
 * Observable. The output Observable only completes once all input Observables
 * have completed. Any error delivered by an input Observable will be immediately
 * emitted on the output Observable.
 *
 * @example <caption>Merge together two Observables: 1s interval and clicks</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var timer = Rx.Observable.interval(1000);
 * var clicksOrTimer = clicks.merge(timer);
 * clicksOrTimer.subscribe(x => console.log(x));
 *
 * @example <caption>Merge together 3 Observables, but only 2 run concurrently</caption>
 * var timer1 = Rx.Observable.interval(1000).take(10);
 * var timer2 = Rx.Observable.interval(2000).take(6);
 * var timer3 = Rx.Observable.interval(500).take(10);
 * var concurrent = 2; // the argument
 * var merged = timer1.merge(timer2, timer3, concurrent);
 * merged.subscribe(x => console.log(x));
 *
 * @see {@link mergeAll}
 * @see {@link mergeMap}
 * @see {@link mergeMapTo}
 * @see {@link mergeScan}
 *
 * @param {ObservableInput} other An input Observable to merge with the source
 * Observable. More than one input Observables may be given as argument.
 * @param {number} [concurrent=Number.POSITIVE_INFINITY] Maximum number of input
 * Observables being subscribed to concurrently.
 * @param {Scheduler} [scheduler=null] The IScheduler to use for managing
 * concurrency of input Observables.
 * @return {Observable} An Observable that emits items that are the result of
 * every input Observable.
 * @method merge
 * @owner Observable
 */
function merge() {
    var observables = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        observables[_i - 0] = arguments[_i];
    }
    return this.lift.call(mergeStatic.apply(void 0, [this].concat(observables)));
}
exports.merge = merge;
/* tslint:enable:max-line-length */
/**
 * Creates an output Observable which concurrently emits all values from every
 * given input Observable.
 *
 * <span class="informal">Flattens multiple Observables together by blending
 * their values into one Observable.</span>
 *
 * <img src="./img/merge.png" width="100%">
 *
 * `merge` subscribes to each given input Observable (as arguments), and simply
 * forwards (without doing any transformation) all the values from all the input
 * Observables to the output Observable. The output Observable only completes
 * once all input Observables have completed. Any error delivered by an input
 * Observable will be immediately emitted on the output Observable.
 *
 * @example <caption>Merge together two Observables: 1s interval and clicks</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var timer = Rx.Observable.interval(1000);
 * var clicksOrTimer = Rx.Observable.merge(clicks, timer);
 * clicksOrTimer.subscribe(x => console.log(x));
 *
 * // Results in the following:
 * // timer will emit ascending values, one every second(1000ms) to console
 * // clicks logs MouseEvents to console everytime the "document" is clicked
 * // Since the two streams are merged you see these happening
 * // as they occur.
 *
 * @example <caption>Merge together 3 Observables, but only 2 run concurrently</caption>
 * var timer1 = Rx.Observable.interval(1000).take(10);
 * var timer2 = Rx.Observable.interval(2000).take(6);
 * var timer3 = Rx.Observable.interval(500).take(10);
 * var concurrent = 2; // the argument
 * var merged = Rx.Observable.merge(timer1, timer2, timer3, concurrent);
 * merged.subscribe(x => console.log(x));
 *
 * // Results in the following:
 * // - First timer1 and timer2 will run concurrently
 * // - timer1 will emit a value every 1000ms for 10 iterations
 * // - timer2 will emit a value every 2000ms for 6 iterations
 * // - after timer1 hits it's max iteration, timer2 will
 * //   continue, and timer3 will start to run concurrently with timer2
 * // - when timer2 hits it's max iteration it terminates, and
 * //   timer3 will continue to emit a value every 500ms until it is complete
 *
 * @see {@link mergeAll}
 * @see {@link mergeMap}
 * @see {@link mergeMapTo}
 * @see {@link mergeScan}
 *
 * @param {...ObservableInput} observables Input Observables to merge together.
 * @param {number} [concurrent=Number.POSITIVE_INFINITY] Maximum number of input
 * Observables being subscribed to concurrently.
 * @param {Scheduler} [scheduler=null] The IScheduler to use for managing
 * concurrency of input Observables.
 * @return {Observable} an Observable that emits items that are the result of
 * every input Observable.
 * @static true
 * @name merge
 * @owner Observable
 */
function mergeStatic() {
    var observables = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        observables[_i - 0] = arguments[_i];
    }
    var concurrent = Number.POSITIVE_INFINITY;
    var scheduler = null;
    var last = observables[observables.length - 1];
    if (isScheduler_1.isScheduler(last)) {
        scheduler = observables.pop();
        if (observables.length > 1 && typeof observables[observables.length - 1] === 'number') {
            concurrent = observables.pop();
        }
    }
    else if (typeof last === 'number') {
        concurrent = observables.pop();
    }
    if (scheduler === null && observables.length === 1 && observables[0] instanceof Observable_1.Observable) {
        return observables[0];
    }
    return new ArrayObservable_1.ArrayObservable(observables, scheduler).lift(new mergeAll_1.MergeAllOperator(concurrent));
}
exports.mergeStatic = mergeStatic;
//# sourceMappingURL=merge.js.map

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Observable_1 = __webpack_require__(3);
var ScalarObservable_1 = __webpack_require__(78);
var EmptyObservable_1 = __webpack_require__(79);
var isScheduler_1 = __webpack_require__(50);
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
var ArrayObservable = (function (_super) {
    __extends(ArrayObservable, _super);
    function ArrayObservable(array, scheduler) {
        _super.call(this);
        this.array = array;
        this.scheduler = scheduler;
        if (!scheduler && array.length === 1) {
            this._isScalar = true;
            this.value = array[0];
        }
    }
    ArrayObservable.create = function (array, scheduler) {
        return new ArrayObservable(array, scheduler);
    };
    /**
     * Creates an Observable that emits some values you specify as arguments,
     * immediately one after the other, and then emits a complete notification.
     *
     * <span class="informal">Emits the arguments you provide, then completes.
     * </span>
     *
     * <img src="./img/of.png" width="100%">
     *
     * This static operator is useful for creating a simple Observable that only
     * emits the arguments given, and the complete notification thereafter. It can
     * be used for composing with other Observables, such as with {@link concat}.
     * By default, it uses a `null` IScheduler, which means the `next`
     * notifications are sent synchronously, although with a different IScheduler
     * it is possible to determine when those notifications will be delivered.
     *
     * @example <caption>Emit 10, 20, 30, then 'a', 'b', 'c', then start ticking every second.</caption>
     * var numbers = Rx.Observable.of(10, 20, 30);
     * var letters = Rx.Observable.of('a', 'b', 'c');
     * var interval = Rx.Observable.interval(1000);
     * var result = numbers.concat(letters).concat(interval);
     * result.subscribe(x => console.log(x));
     *
     * @see {@link create}
     * @see {@link empty}
     * @see {@link never}
     * @see {@link throw}
     *
     * @param {...T} values Arguments that represent `next` values to be emitted.
     * @param {Scheduler} [scheduler] A {@link IScheduler} to use for scheduling
     * the emissions of the `next` notifications.
     * @return {Observable<T>} An Observable that emits each given input value.
     * @static true
     * @name of
     * @owner Observable
     */
    ArrayObservable.of = function () {
        var array = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            array[_i - 0] = arguments[_i];
        }
        var scheduler = array[array.length - 1];
        if (isScheduler_1.isScheduler(scheduler)) {
            array.pop();
        }
        else {
            scheduler = null;
        }
        var len = array.length;
        if (len > 1) {
            return new ArrayObservable(array, scheduler);
        }
        else if (len === 1) {
            return new ScalarObservable_1.ScalarObservable(array[0], scheduler);
        }
        else {
            return new EmptyObservable_1.EmptyObservable(scheduler);
        }
    };
    ArrayObservable.dispatch = function (state) {
        var array = state.array, index = state.index, count = state.count, subscriber = state.subscriber;
        if (index >= count) {
            subscriber.complete();
            return;
        }
        subscriber.next(array[index]);
        if (subscriber.closed) {
            return;
        }
        state.index = index + 1;
        this.schedule(state);
    };
    ArrayObservable.prototype._subscribe = function (subscriber) {
        var index = 0;
        var array = this.array;
        var count = array.length;
        var scheduler = this.scheduler;
        if (scheduler) {
            return scheduler.schedule(ArrayObservable.dispatch, 0, {
                array: array, index: index, count: count, subscriber: subscriber
            });
        }
        else {
            for (var i = 0; i < count && !subscriber.closed; i++) {
                subscriber.next(array[i]);
            }
            subscriber.complete();
        }
    };
    return ArrayObservable;
}(Observable_1.Observable));
exports.ArrayObservable = ArrayObservable;
//# sourceMappingURL=ArrayObservable.js.map

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Observable_1 = __webpack_require__(3);
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
var ScalarObservable = (function (_super) {
    __extends(ScalarObservable, _super);
    function ScalarObservable(value, scheduler) {
        _super.call(this);
        this.value = value;
        this.scheduler = scheduler;
        this._isScalar = true;
        if (scheduler) {
            this._isScalar = false;
        }
    }
    ScalarObservable.create = function (value, scheduler) {
        return new ScalarObservable(value, scheduler);
    };
    ScalarObservable.dispatch = function (state) {
        var done = state.done, value = state.value, subscriber = state.subscriber;
        if (done) {
            subscriber.complete();
            return;
        }
        subscriber.next(value);
        if (subscriber.closed) {
            return;
        }
        state.done = true;
        this.schedule(state);
    };
    ScalarObservable.prototype._subscribe = function (subscriber) {
        var value = this.value;
        var scheduler = this.scheduler;
        if (scheduler) {
            return scheduler.schedule(ScalarObservable.dispatch, 0, {
                done: false, value: value, subscriber: subscriber
            });
        }
        else {
            subscriber.next(value);
            if (!subscriber.closed) {
                subscriber.complete();
            }
        }
    };
    return ScalarObservable;
}(Observable_1.Observable));
exports.ScalarObservable = ScalarObservable;
//# sourceMappingURL=ScalarObservable.js.map

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Observable_1 = __webpack_require__(3);
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
var EmptyObservable = (function (_super) {
    __extends(EmptyObservable, _super);
    function EmptyObservable(scheduler) {
        _super.call(this);
        this.scheduler = scheduler;
    }
    /**
     * Creates an Observable that emits no items to the Observer and immediately
     * emits a complete notification.
     *
     * <span class="informal">Just emits 'complete', and nothing else.
     * </span>
     *
     * <img src="./img/empty.png" width="100%">
     *
     * This static operator is useful for creating a simple Observable that only
     * emits the complete notification. It can be used for composing with other
     * Observables, such as in a {@link mergeMap}.
     *
     * @example <caption>Emit the number 7, then complete.</caption>
     * var result = Rx.Observable.empty().startWith(7);
     * result.subscribe(x => console.log(x));
     *
     * @example <caption>Map and flatten only odd numbers to the sequence 'a', 'b', 'c'</caption>
     * var interval = Rx.Observable.interval(1000);
     * var result = interval.mergeMap(x =>
     *   x % 2 === 1 ? Rx.Observable.of('a', 'b', 'c') : Rx.Observable.empty()
     * );
     * result.subscribe(x => console.log(x));
     *
     * // Results in the following to the console:
     * // x is equal to the count on the interval eg(0,1,2,3,...)
     * // x will occur every 1000ms
     * // if x % 2 is equal to 1 print abc
     * // if x % 2 is not equal to 1 nothing will be output
     *
     * @see {@link create}
     * @see {@link never}
     * @see {@link of}
     * @see {@link throw}
     *
     * @param {Scheduler} [scheduler] A {@link IScheduler} to use for scheduling
     * the emission of the complete notification.
     * @return {Observable} An "empty" Observable: emits only the complete
     * notification.
     * @static true
     * @name empty
     * @owner Observable
     */
    EmptyObservable.create = function (scheduler) {
        return new EmptyObservable(scheduler);
    };
    EmptyObservable.dispatch = function (arg) {
        var subscriber = arg.subscriber;
        subscriber.complete();
    };
    EmptyObservable.prototype._subscribe = function (subscriber) {
        var scheduler = this.scheduler;
        if (scheduler) {
            return scheduler.schedule(EmptyObservable.dispatch, 0, { subscriber: subscriber });
        }
        else {
            subscriber.complete();
        }
    };
    return EmptyObservable;
}(Observable_1.Observable));
exports.EmptyObservable = EmptyObservable;
//# sourceMappingURL=EmptyObservable.js.map

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var OuterSubscriber_1 = __webpack_require__(81);
var subscribeToResult_1 = __webpack_require__(82);
/**
 * Converts a higher-order Observable into a first-order Observable which
 * concurrently delivers all values that are emitted on the inner Observables.
 *
 * <span class="informal">Flattens an Observable-of-Observables.</span>
 *
 * <img src="./img/mergeAll.png" width="100%">
 *
 * `mergeAll` subscribes to an Observable that emits Observables, also known as
 * a higher-order Observable. Each time it observes one of these emitted inner
 * Observables, it subscribes to that and delivers all the values from the
 * inner Observable on the output Observable. The output Observable only
 * completes once all inner Observables have completed. Any error delivered by
 * a inner Observable will be immediately emitted on the output Observable.
 *
 * @example <caption>Spawn a new interval Observable for each click event, and blend their outputs as one Observable</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var higherOrder = clicks.map((ev) => Rx.Observable.interval(1000));
 * var firstOrder = higherOrder.mergeAll();
 * firstOrder.subscribe(x => console.log(x));
 *
 * @example <caption>Count from 0 to 9 every second for each click, but only allow 2 concurrent timers</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var higherOrder = clicks.map((ev) => Rx.Observable.interval(1000).take(10));
 * var firstOrder = higherOrder.mergeAll(2);
 * firstOrder.subscribe(x => console.log(x));
 *
 * @see {@link combineAll}
 * @see {@link concatAll}
 * @see {@link exhaust}
 * @see {@link merge}
 * @see {@link mergeMap}
 * @see {@link mergeMapTo}
 * @see {@link mergeScan}
 * @see {@link switch}
 * @see {@link zipAll}
 *
 * @param {number} [concurrent=Number.POSITIVE_INFINITY] Maximum number of inner
 * Observables being subscribed to concurrently.
 * @return {Observable} An Observable that emits values coming from all the
 * inner Observables emitted by the source Observable.
 * @method mergeAll
 * @owner Observable
 */
function mergeAll(concurrent) {
    if (concurrent === void 0) { concurrent = Number.POSITIVE_INFINITY; }
    return this.lift(new MergeAllOperator(concurrent));
}
exports.mergeAll = mergeAll;
var MergeAllOperator = (function () {
    function MergeAllOperator(concurrent) {
        this.concurrent = concurrent;
    }
    MergeAllOperator.prototype.call = function (observer, source) {
        return source.subscribe(new MergeAllSubscriber(observer, this.concurrent));
    };
    return MergeAllOperator;
}());
exports.MergeAllOperator = MergeAllOperator;
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var MergeAllSubscriber = (function (_super) {
    __extends(MergeAllSubscriber, _super);
    function MergeAllSubscriber(destination, concurrent) {
        _super.call(this, destination);
        this.concurrent = concurrent;
        this.hasCompleted = false;
        this.buffer = [];
        this.active = 0;
    }
    MergeAllSubscriber.prototype._next = function (observable) {
        if (this.active < this.concurrent) {
            this.active++;
            this.add(subscribeToResult_1.subscribeToResult(this, observable));
        }
        else {
            this.buffer.push(observable);
        }
    };
    MergeAllSubscriber.prototype._complete = function () {
        this.hasCompleted = true;
        if (this.active === 0 && this.buffer.length === 0) {
            this.destination.complete();
        }
    };
    MergeAllSubscriber.prototype.notifyComplete = function (innerSub) {
        var buffer = this.buffer;
        this.remove(innerSub);
        this.active--;
        if (buffer.length > 0) {
            this._next(buffer.shift());
        }
        else if (this.active === 0 && this.hasCompleted) {
            this.destination.complete();
        }
    };
    return MergeAllSubscriber;
}(OuterSubscriber_1.OuterSubscriber));
exports.MergeAllSubscriber = MergeAllSubscriber;
//# sourceMappingURL=mergeAll.js.map

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = __webpack_require__(13);
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var OuterSubscriber = (function (_super) {
    __extends(OuterSubscriber, _super);
    function OuterSubscriber() {
        _super.apply(this, arguments);
    }
    OuterSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.destination.next(innerValue);
    };
    OuterSubscriber.prototype.notifyError = function (error, innerSub) {
        this.destination.error(error);
    };
    OuterSubscriber.prototype.notifyComplete = function (innerSub) {
        this.destination.complete();
    };
    return OuterSubscriber;
}(Subscriber_1.Subscriber));
exports.OuterSubscriber = OuterSubscriber;
//# sourceMappingURL=OuterSubscriber.js.map

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var root_1 = __webpack_require__(18);
var isArrayLike_1 = __webpack_require__(83);
var isPromise_1 = __webpack_require__(84);
var isObject_1 = __webpack_require__(46);
var Observable_1 = __webpack_require__(3);
var iterator_1 = __webpack_require__(85);
var InnerSubscriber_1 = __webpack_require__(86);
var observable_1 = __webpack_require__(49);
function subscribeToResult(outerSubscriber, result, outerValue, outerIndex) {
    var destination = new InnerSubscriber_1.InnerSubscriber(outerSubscriber, outerValue, outerIndex);
    if (destination.closed) {
        return null;
    }
    if (result instanceof Observable_1.Observable) {
        if (result._isScalar) {
            destination.next(result.value);
            destination.complete();
            return null;
        }
        else {
            return result.subscribe(destination);
        }
    }
    else if (isArrayLike_1.isArrayLike(result)) {
        for (var i = 0, len = result.length; i < len && !destination.closed; i++) {
            destination.next(result[i]);
        }
        if (!destination.closed) {
            destination.complete();
        }
    }
    else if (isPromise_1.isPromise(result)) {
        result.then(function (value) {
            if (!destination.closed) {
                destination.next(value);
                destination.complete();
            }
        }, function (err) { return destination.error(err); })
            .then(null, function (err) {
            // Escaping the Promise trap: globally throw unhandled errors
            root_1.root.setTimeout(function () { throw err; });
        });
        return destination;
    }
    else if (result && typeof result[iterator_1.iterator] === 'function') {
        var iterator = result[iterator_1.iterator]();
        do {
            var item = iterator.next();
            if (item.done) {
                destination.complete();
                break;
            }
            destination.next(item.value);
            if (destination.closed) {
                break;
            }
        } while (true);
    }
    else if (result && typeof result[observable_1.observable] === 'function') {
        var obs = result[observable_1.observable]();
        if (typeof obs.subscribe !== 'function') {
            destination.error(new TypeError('Provided object does not correctly implement Symbol.observable'));
        }
        else {
            return obs.subscribe(new InnerSubscriber_1.InnerSubscriber(outerSubscriber, outerValue, outerIndex));
        }
    }
    else {
        var value = isObject_1.isObject(result) ? 'an invalid object' : "'" + result + "'";
        var msg = ("You provided " + value + " where a stream was expected.")
            + ' You can provide an Observable, Promise, Array, or Iterable.';
        destination.error(new TypeError(msg));
    }
    return null;
}
exports.subscribeToResult = subscribeToResult;
//# sourceMappingURL=subscribeToResult.js.map

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.isArrayLike = (function (x) { return x && typeof x.length === 'number'; });
//# sourceMappingURL=isArrayLike.js.map

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function isPromise(value) {
    return value && typeof value.subscribe !== 'function' && typeof value.then === 'function';
}
exports.isPromise = isPromise;
//# sourceMappingURL=isPromise.js.map

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var root_1 = __webpack_require__(18);
function symbolIteratorPonyfill(root) {
    var Symbol = root.Symbol;
    if (typeof Symbol === 'function') {
        if (!Symbol.iterator) {
            Symbol.iterator = Symbol('iterator polyfill');
        }
        return Symbol.iterator;
    }
    else {
        // [for Mozilla Gecko 27-35:](https://mzl.la/2ewE1zC)
        var Set_1 = root.Set;
        if (Set_1 && typeof new Set_1()['@@iterator'] === 'function') {
            return '@@iterator';
        }
        var Map_1 = root.Map;
        // required for compatability with es6-shim
        if (Map_1) {
            var keys = Object.getOwnPropertyNames(Map_1.prototype);
            for (var i = 0; i < keys.length; ++i) {
                var key = keys[i];
                // according to spec, Map.prototype[@@iterator] and Map.orototype.entries must be equal.
                if (key !== 'entries' && key !== 'size' && Map_1.prototype[key] === Map_1.prototype['entries']) {
                    return key;
                }
            }
        }
        return '@@iterator';
    }
}
exports.symbolIteratorPonyfill = symbolIteratorPonyfill;
exports.iterator = symbolIteratorPonyfill(root_1.root);
/**
 * @deprecated use iterator instead
 */
exports.$$iterator = exports.iterator;
//# sourceMappingURL=iterator.js.map

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = __webpack_require__(13);
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var InnerSubscriber = (function (_super) {
    __extends(InnerSubscriber, _super);
    function InnerSubscriber(parent, outerValue, outerIndex) {
        _super.call(this);
        this.parent = parent;
        this.outerValue = outerValue;
        this.outerIndex = outerIndex;
        this.index = 0;
    }
    InnerSubscriber.prototype._next = function (value) {
        this.parent.notifyNext(this.outerValue, value, this.outerIndex, this.index++, this);
    };
    InnerSubscriber.prototype._error = function (error) {
        this.parent.notifyError(error, this);
        this.unsubscribe();
    };
    InnerSubscriber.prototype._complete = function () {
        this.parent.notifyComplete(this);
        this.unsubscribe();
    };
    return InnerSubscriber;
}(Subscriber_1.Subscriber));
exports.InnerSubscriber = InnerSubscriber;
//# sourceMappingURL=InnerSubscriber.js.map

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Observable_1 = __webpack_require__(3);
var fromEvent_1 = __webpack_require__(88);
Observable_1.Observable.fromEvent = fromEvent_1.fromEvent;
//# sourceMappingURL=fromEvent.js.map

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var FromEventObservable_1 = __webpack_require__(89);
exports.fromEvent = FromEventObservable_1.FromEventObservable.create;
//# sourceMappingURL=fromEvent.js.map

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Observable_1 = __webpack_require__(3);
var tryCatch_1 = __webpack_require__(47);
var isFunction_1 = __webpack_require__(34);
var errorObject_1 = __webpack_require__(35);
var Subscription_1 = __webpack_require__(27);
var toString = Object.prototype.toString;
function isNodeStyleEventEmitter(sourceObj) {
    return !!sourceObj && typeof sourceObj.addListener === 'function' && typeof sourceObj.removeListener === 'function';
}
function isJQueryStyleEventEmitter(sourceObj) {
    return !!sourceObj && typeof sourceObj.on === 'function' && typeof sourceObj.off === 'function';
}
function isNodeList(sourceObj) {
    return !!sourceObj && toString.call(sourceObj) === '[object NodeList]';
}
function isHTMLCollection(sourceObj) {
    return !!sourceObj && toString.call(sourceObj) === '[object HTMLCollection]';
}
function isEventTarget(sourceObj) {
    return !!sourceObj && typeof sourceObj.addEventListener === 'function' && typeof sourceObj.removeEventListener === 'function';
}
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
var FromEventObservable = (function (_super) {
    __extends(FromEventObservable, _super);
    function FromEventObservable(sourceObj, eventName, selector, options) {
        _super.call(this);
        this.sourceObj = sourceObj;
        this.eventName = eventName;
        this.selector = selector;
        this.options = options;
    }
    /* tslint:enable:max-line-length */
    /**
     * Creates an Observable that emits events of a specific type coming from the
     * given event target.
     *
     * <span class="informal">Creates an Observable from DOM events, or Node
     * EventEmitter events or others.</span>
     *
     * <img src="./img/fromEvent.png" width="100%">
     *
     * Creates an Observable by attaching an event listener to an "event target",
     * which may be an object with `addEventListener` and `removeEventListener`,
     * a Node.js EventEmitter, a jQuery style EventEmitter, a NodeList from the
     * DOM, or an HTMLCollection from the DOM. The event handler is attached when
     * the output Observable is subscribed, and removed when the Subscription is
     * unsubscribed.
     *
     * @example <caption>Emits clicks happening on the DOM document</caption>
     * var clicks = Rx.Observable.fromEvent(document, 'click');
     * clicks.subscribe(x => console.log(x));
     *
     * // Results in:
     * // MouseEvent object logged to console everytime a click
     * // occurs on the document.
     *
     * @see {@link from}
     * @see {@link fromEventPattern}
     *
     * @param {EventTargetLike} target The DOMElement, event target, Node.js
     * EventEmitter, NodeList or HTMLCollection to attach the event handler to.
     * @param {string} eventName The event name of interest, being emitted by the
     * `target`.
     * @param {EventListenerOptions} [options] Options to pass through to addEventListener
     * @param {SelectorMethodSignature<T>} [selector] An optional function to
     * post-process results. It takes the arguments from the event handler and
     * should return a single value.
     * @return {Observable<T>}
     * @static true
     * @name fromEvent
     * @owner Observable
     */
    FromEventObservable.create = function (target, eventName, options, selector) {
        if (isFunction_1.isFunction(options)) {
            selector = options;
            options = undefined;
        }
        return new FromEventObservable(target, eventName, selector, options);
    };
    FromEventObservable.setupSubscription = function (sourceObj, eventName, handler, subscriber, options) {
        var unsubscribe;
        if (isNodeList(sourceObj) || isHTMLCollection(sourceObj)) {
            for (var i = 0, len = sourceObj.length; i < len; i++) {
                FromEventObservable.setupSubscription(sourceObj[i], eventName, handler, subscriber, options);
            }
        }
        else if (isEventTarget(sourceObj)) {
            var source_1 = sourceObj;
            sourceObj.addEventListener(eventName, handler, options);
            unsubscribe = function () { return source_1.removeEventListener(eventName, handler); };
        }
        else if (isJQueryStyleEventEmitter(sourceObj)) {
            var source_2 = sourceObj;
            sourceObj.on(eventName, handler);
            unsubscribe = function () { return source_2.off(eventName, handler); };
        }
        else if (isNodeStyleEventEmitter(sourceObj)) {
            var source_3 = sourceObj;
            sourceObj.addListener(eventName, handler);
            unsubscribe = function () { return source_3.removeListener(eventName, handler); };
        }
        else {
            throw new TypeError('Invalid event target');
        }
        subscriber.add(new Subscription_1.Subscription(unsubscribe));
    };
    FromEventObservable.prototype._subscribe = function (subscriber) {
        var sourceObj = this.sourceObj;
        var eventName = this.eventName;
        var options = this.options;
        var selector = this.selector;
        var handler = selector ? function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            var result = tryCatch_1.tryCatch(selector).apply(void 0, args);
            if (result === errorObject_1.errorObject) {
                subscriber.error(errorObject_1.errorObject.e);
            }
            else {
                subscriber.next(result);
            }
        } : function (e) { return subscriber.next(e); };
        FromEventObservable.setupSubscription(sourceObj, eventName, handler, subscriber, options);
    };
    return FromEventObservable;
}(Observable_1.Observable));
exports.FromEventObservable = FromEventObservable;
//# sourceMappingURL=FromEventObservable.js.map

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Observable_1 = __webpack_require__(3);
var map_1 = __webpack_require__(91);
Observable_1.Observable.prototype.map = map_1.map;
//# sourceMappingURL=map.js.map

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = __webpack_require__(13);
/**
 * Applies a given `project` function to each value emitted by the source
 * Observable, and emits the resulting values as an Observable.
 *
 * <span class="informal">Like [Array.prototype.map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map),
 * it passes each source value through a transformation function to get
 * corresponding output values.</span>
 *
 * <img src="./img/map.png" width="100%">
 *
 * Similar to the well known `Array.prototype.map` function, this operator
 * applies a projection to each value and emits that projection in the output
 * Observable.
 *
 * @example <caption>Map every click to the clientX position of that click</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var positions = clicks.map(ev => ev.clientX);
 * positions.subscribe(x => console.log(x));
 *
 * @see {@link mapTo}
 * @see {@link pluck}
 *
 * @param {function(value: T, index: number): R} project The function to apply
 * to each `value` emitted by the source Observable. The `index` parameter is
 * the number `i` for the i-th emission that has happened since the
 * subscription, starting from the number `0`.
 * @param {any} [thisArg] An optional argument to define what `this` is in the
 * `project` function.
 * @return {Observable<R>} An Observable that emits the values from the source
 * Observable transformed by the given `project` function.
 * @method map
 * @owner Observable
 */
function map(project, thisArg) {
    if (typeof project !== 'function') {
        throw new TypeError('argument is not a function. Are you looking for `mapTo()`?');
    }
    return this.lift(new MapOperator(project, thisArg));
}
exports.map = map;
var MapOperator = (function () {
    function MapOperator(project, thisArg) {
        this.project = project;
        this.thisArg = thisArg;
    }
    MapOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new MapSubscriber(subscriber, this.project, this.thisArg));
    };
    return MapOperator;
}());
exports.MapOperator = MapOperator;
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var MapSubscriber = (function (_super) {
    __extends(MapSubscriber, _super);
    function MapSubscriber(destination, project, thisArg) {
        _super.call(this, destination);
        this.project = project;
        this.count = 0;
        this.thisArg = thisArg || this;
    }
    // NOTE: This looks unoptimized, but it's actually purposefully NOT
    // using try/catch optimizations.
    MapSubscriber.prototype._next = function (value) {
        var result;
        try {
            result = this.project.call(this.thisArg, value, this.count++);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        this.destination.next(result);
    };
    return MapSubscriber;
}(Subscriber_1.Subscriber));
//# sourceMappingURL=map.js.map

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Observable_1 = __webpack_require__(3);
var filter_1 = __webpack_require__(93);
Observable_1.Observable.prototype.filter = filter_1.filter;
//# sourceMappingURL=filter.js.map

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = __webpack_require__(13);
/* tslint:enable:max-line-length */
/**
 * Filter items emitted by the source Observable by only emitting those that
 * satisfy a specified predicate.
 *
 * <span class="informal">Like
 * [Array.prototype.filter()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter),
 * it only emits a value from the source if it passes a criterion function.</span>
 *
 * <img src="./img/filter.png" width="100%">
 *
 * Similar to the well-known `Array.prototype.filter` method, this operator
 * takes values from the source Observable, passes them through a `predicate`
 * function and only emits those values that yielded `true`.
 *
 * @example <caption>Emit only click events whose target was a DIV element</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var clicksOnDivs = clicks.filter(ev => ev.target.tagName === 'DIV');
 * clicksOnDivs.subscribe(x => console.log(x));
 *
 * @see {@link distinct}
 * @see {@link distinctUntilChanged}
 * @see {@link distinctUntilKeyChanged}
 * @see {@link ignoreElements}
 * @see {@link partition}
 * @see {@link skip}
 *
 * @param {function(value: T, index: number): boolean} predicate A function that
 * evaluates each value emitted by the source Observable. If it returns `true`,
 * the value is emitted, if `false` the value is not passed to the output
 * Observable. The `index` parameter is the number `i` for the i-th source
 * emission that has happened since the subscription, starting from the number
 * `0`.
 * @param {any} [thisArg] An optional argument to determine the value of `this`
 * in the `predicate` function.
 * @return {Observable} An Observable of values from the source that were
 * allowed by the `predicate` function.
 * @method filter
 * @owner Observable
 */
function filter(predicate, thisArg) {
    return this.lift(new FilterOperator(predicate, thisArg));
}
exports.filter = filter;
var FilterOperator = (function () {
    function FilterOperator(predicate, thisArg) {
        this.predicate = predicate;
        this.thisArg = thisArg;
    }
    FilterOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new FilterSubscriber(subscriber, this.predicate, this.thisArg));
    };
    return FilterOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var FilterSubscriber = (function (_super) {
    __extends(FilterSubscriber, _super);
    function FilterSubscriber(destination, predicate, thisArg) {
        _super.call(this, destination);
        this.predicate = predicate;
        this.thisArg = thisArg;
        this.count = 0;
    }
    // the try catch block below is left specifically for
    // optimization and perf reasons. a tryCatcher is not necessary here.
    FilterSubscriber.prototype._next = function (value) {
        var result;
        try {
            result = this.predicate.call(this.thisArg, value, this.count++);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        if (result) {
            this.destination.next(value);
        }
    };
    return FilterSubscriber;
}(Subscriber_1.Subscriber));
//# sourceMappingURL=filter.js.map

/***/ }),
/* 94 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var Inject_1 = __webpack_require__(0);
var Screen_1 = __webpack_require__(19);
var SceneManager_1 = __webpack_require__(15);
var BrowserDelegate_1 = __webpack_require__(4);
var Time_1 = __webpack_require__(20);
var Vector_1 = __webpack_require__(1);
var Service_1 = __webpack_require__(2);
var Engine_1 = __webpack_require__(21);
var EngineImplement = (function () {
    function EngineImplement(screen, time, sceneManager, browser) {
        this.screen = screen;
        this.time = time;
        this.sceneManager = sceneManager;
        this.browser = browser;
        this.gravity = Vector_1.Vector.Get(0, -100);
        this.accumulator = 0;
        this._isPaused = true;
        this.isInitialized = false;
        this.bindedmainloop = this.mainloop.bind(this);
        this.lastTimestamp = 0;
        this.canvas = this.browser.document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
    }
    Object.defineProperty(EngineImplement.prototype, "isPaused", {
        get: function () { return this._isPaused; },
        enumerable: true,
        configurable: true
    });
    EngineImplement.prototype.initialize = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var _a, width, height, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (this.isInitialized) {
                            throw new Error('Repeated engine initialization.');
                        }
                        this.check();
                        this.isInitialized = true;
                        _a = this.screen, width = _a.width, height = _a.height;
                        this.canvas.width = width;
                        this.canvas.height = height;
                        this.browser.document.body.appendChild(this.canvas);
                        this.browser.resize$.subscribe(function (e) { return _this.onResize(e); });
                        this.sceneManager.sceneLoaded$.subscribe(function (s) { return _this.onSceneLoaded(s); });
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4, this.sceneManager.currentScene.load()];
                    case 2:
                        _b.sent();
                        return [3, 4];
                    case 3:
                        err_1 = _b.sent();
                        console.error(err_1);
                        return [3, 4];
                    case 4:
                        this.currentScene = this.sceneManager.currentScene;
                        this.resume();
                        return [2];
                }
            });
        });
    };
    EngineImplement.prototype.pause = function () {
        this._isPaused = true;
    };
    EngineImplement.prototype.resume = function () {
        this._isPaused = false;
        requestAnimationFrame(this.bindedmainloop);
    };
    EngineImplement.prototype.check = function () {
        if (!this.sceneManager.currentScene) {
            throw new Error('No active scene');
        }
    };
    EngineImplement.prototype.mainloop = function (timestamp) {
        if (this._isPaused) {
            return;
        }
        var frameTime = timestamp - this.lastTimestamp;
        this.lastTimestamp = timestamp;
        this.accumulator += frameTime;
        if (this.accumulator > 200) {
            this.accumulator = 200;
        }
        while (this.accumulator > this.time.fixedDeltaTime) {
            this.time.tick(frameTime);
            this.currentScene.fixedUpdate(1);
            this.accumulator -= this.time.fixedDeltaTime;
        }
        this.currentScene.fixedUpdate(this.accumulator / this.time.fixedDeltaTime);
        this.accumulator = 0;
        this.currentScene.update();
        this.currentScene.lateUpdate();
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.currentScene.preRender();
        this.currentScene.render(this.ctx, this.canvas.width, this.canvas.height);
        this.currentScene.postRender();
        requestAnimationFrame(this.bindedmainloop);
    };
    EngineImplement.prototype.onResize = function (e) {
        var _a = this.screen, width = _a.width, height = _a.height;
        this.canvas.width = width;
        this.canvas.height = height;
    };
    EngineImplement.prototype.onSceneLoaded = function (scene) {
        this.currentScene = scene;
    };
    EngineImplement = __decorate([
        Service_1.Service(Engine_1.Engine),
        __param(0, Inject_1.Inject(Screen_1.Screen)),
        __param(1, Inject_1.Inject(Time_1.Time)),
        __param(2, Inject_1.Inject(SceneManager_1.SceneManager)),
        __param(3, Inject_1.Inject(BrowserDelegate_1.BrowserDelegate)),
        __metadata("design:paramtypes", [Object, Object, Object, Object])
    ], EngineImplement);
    return EngineImplement;
}());
exports.EngineImplement = EngineImplement;


/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Service_1 = __webpack_require__(2);
var GameObjectInitializer_1 = __webpack_require__(28);
var GameObjectInitializerImplement = (function () {
    function GameObjectInitializerImplement() {
        this.queue = [];
    }
    Object.defineProperty(GameObjectInitializerImplement.prototype, "length", {
        get: function () { return this.queue.length; },
        enumerable: true,
        configurable: true
    });
    GameObjectInitializerImplement.prototype.push = function (gameObject) {
        this.queue.push(gameObject);
    };
    GameObjectInitializerImplement.prototype.resolve = function () {
        var gameObject = this.queue.shift();
        while (gameObject) {
            gameObject.initialize();
            gameObject = this.queue.shift();
        }
    };
    GameObjectInitializerImplement = __decorate([
        Service_1.Service(GameObjectInitializer_1.GameObjectInitializer)
    ], GameObjectInitializerImplement);
    return GameObjectInitializerImplement;
}());
exports.GameObjectInitializerImplement = GameObjectInitializerImplement;


/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var Subject_1 = __webpack_require__(38);
var ArrayUtility_1 = __webpack_require__(5);
var Service_1 = __webpack_require__(2);
var SceneManager_1 = __webpack_require__(15);
var SceneManagerImplement = (function () {
    function SceneManagerImplement() {
        this.scenes = [];
        this._isLoading = false;
        this.sceneLoaded = new Subject_1.Subject();
        this.sceneUnloaded = new Subject_1.Subject();
        this.sceneWillLoad = new Subject_1.Subject();
        this.sceneWillUnload = new Subject_1.Subject();
    }
    Object.defineProperty(SceneManagerImplement.prototype, "isLoading", {
        get: function () { return this._isLoading; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SceneManagerImplement.prototype, "sceneLoaded$", {
        get: function () { return this.sceneLoaded.asObservable(); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SceneManagerImplement.prototype, "sceneUnloaded$", {
        get: function () { return this.sceneUnloaded.asObservable(); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SceneManagerImplement.prototype, "sceneWillLoad$", {
        get: function () { return this.sceneWillLoad.asObservable(); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SceneManagerImplement.prototype, "sceneWillUnload$", {
        get: function () { return this.sceneWillUnload.asObservable(); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SceneManagerImplement.prototype, "currentScene", {
        get: function () { return this._currentScene; },
        enumerable: true,
        configurable: true
    });
    SceneManagerImplement.prototype.add = function (scene) {
        if (!ArrayUtility_1.addToArray(this.scenes, scene)) {
            return false;
        }
        if (!this._currentScene) {
            this._currentScene = scene;
        }
        return true;
    };
    SceneManagerImplement.prototype.remove = function (scene) {
        if (this._currentScene === scene) {
            throw new Error('Cannot remove current scene.');
        }
        return ArrayUtility_1.removeFromArray(this.scenes, scene);
    };
    SceneManagerImplement.prototype.switchTo = function (scene) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                if (!ArrayUtility_1.includeInArray(this.scenes, scene)) {
                    this.add(scene);
                }
                if (this._currentScene === scene) {
                    return [2, Promise.resolve()];
                }
                this._isLoading = true;
                if (this._currentScene) {
                    this.sceneWillUnload.next(this._currentScene);
                }
                this.sceneWillLoad.next(scene);
                return [2, (scene.isLoaded ? Promise.resolve() : scene.load()).then(function () {
                        _this._currentScene.deactivate();
                        _this.sceneUnloaded.next(_this._currentScene);
                        _this._currentScene = scene;
                        _this._isLoading = false;
                        _this.sceneLoaded.next(_this._currentScene);
                    })];
            });
        });
    };
    SceneManagerImplement = __decorate([
        Service_1.Service(SceneManager_1.SceneManager)
    ], SceneManagerImplement);
    return SceneManagerImplement;
}());
exports.SceneManagerImplement = SceneManagerImplement;


/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscription_1 = __webpack_require__(27);
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var SubjectSubscription = (function (_super) {
    __extends(SubjectSubscription, _super);
    function SubjectSubscription(subject, subscriber) {
        _super.call(this);
        this.subject = subject;
        this.subscriber = subscriber;
        this.closed = false;
    }
    SubjectSubscription.prototype.unsubscribe = function () {
        if (this.closed) {
            return;
        }
        this.closed = true;
        var subject = this.subject;
        var observers = subject.observers;
        this.subject = null;
        if (!observers || observers.length === 0 || subject.isStopped || subject.closed) {
            return;
        }
        var subscriberIndex = observers.indexOf(this.subscriber);
        if (subscriberIndex !== -1) {
            observers.splice(subscriberIndex, 1);
        }
    };
    return SubjectSubscription;
}(Subscription_1.Subscription));
exports.SubjectSubscription = SubjectSubscription;
//# sourceMappingURL=SubjectSubscription.js.map

/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var BrowserDelegate_1 = __webpack_require__(4);
var Service_1 = __webpack_require__(2);
var Screen_1 = __webpack_require__(19);
var Inject_1 = __webpack_require__(0);
var ScreenImplement = (function () {
    function ScreenImplement(browserDelegate) {
        this.browserDelegate = browserDelegate;
        this._isFullScreen = false;
    }
    Object.defineProperty(ScreenImplement.prototype, "width", {
        get: function () {
            return this._isFullScreen ?
                this.browserDelegate.screen.width :
                this.browserDelegate.window.innerWidth;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScreenImplement.prototype, "height", {
        get: function () {
            return this._isFullScreen ?
                this.browserDelegate.screen.height :
                this.browserDelegate.window.innerHeight;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScreenImplement.prototype, "isFullScreen", {
        get: function () { return this._isFullScreen; },
        enumerable: true,
        configurable: true
    });
    ScreenImplement.prototype.setFullScreen = function (enable) {
        if (enable === void 0) { enable = true; }
        this._isFullScreen = enable;
    };
    ScreenImplement = __decorate([
        Service_1.Service(Screen_1.Screen),
        __param(0, Inject_1.Inject(BrowserDelegate_1.BrowserDelegate)),
        __metadata("design:paramtypes", [Object])
    ], ScreenImplement);
    return ScreenImplement;
}());
exports.ScreenImplement = ScreenImplement;


/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var BrowserDelegate_1 = __webpack_require__(4);
var Service_1 = __webpack_require__(2);
var KeyboardInput_1 = __webpack_require__(39);
var Inject_1 = __webpack_require__(0);
var KeyboardInputImplement = (function () {
    function KeyboardInputImplement(browserDelegate) {
        this.browserDelegate = browserDelegate;
    }
    Object.defineProperty(KeyboardInputImplement.prototype, "keyDown$", {
        get: function () { return this.browserDelegate.keyDown$; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(KeyboardInputImplement.prototype, "keyUp$", {
        get: function () { return this.browserDelegate.keyUp$; },
        enumerable: true,
        configurable: true
    });
    KeyboardInputImplement = __decorate([
        Service_1.Service(KeyboardInput_1.KeyboardInput),
        __param(0, Inject_1.Inject(BrowserDelegate_1.BrowserDelegate)),
        __metadata("design:paramtypes", [Object])
    ], KeyboardInputImplement);
    return KeyboardInputImplement;
}());
exports.KeyboardInputImplement = KeyboardInputImplement;


/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var BrowserDelegate_1 = __webpack_require__(4);
var Service_1 = __webpack_require__(2);
var MouseInput_1 = __webpack_require__(54);
var Inject_1 = __webpack_require__(0);
var MouseInputImplement = (function () {
    function MouseInputImplement(browserDelegate) {
        this.browserDelegate = browserDelegate;
    }
    Object.defineProperty(MouseInputImplement.prototype, "click$", {
        get: function () { return this.browserDelegate.click$; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MouseInputImplement.prototype, "mouseMove$", {
        get: function () { return this.browserDelegate.mouseMove$; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MouseInputImplement.prototype, "mouseDown$", {
        get: function () { return this.browserDelegate.mouseDown$; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MouseInputImplement.prototype, "mouseUp$", {
        get: function () { return this.browserDelegate.mouseUp$; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MouseInputImplement.prototype, "wheel$", {
        get: function () { return this.browserDelegate.wheel$; },
        enumerable: true,
        configurable: true
    });
    MouseInputImplement = __decorate([
        Service_1.Service(MouseInput_1.MouseInput),
        __param(0, Inject_1.Inject(BrowserDelegate_1.BrowserDelegate)),
        __metadata("design:paramtypes", [Object])
    ], MouseInputImplement);
    return MouseInputImplement;
}());
exports.MouseInputImplement = MouseInputImplement;


/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var BrowserDelegate_1 = __webpack_require__(4);
var Service_1 = __webpack_require__(2);
var TouchInput_1 = __webpack_require__(55);
var Inject_1 = __webpack_require__(0);
var TouchInputImplement = (function () {
    function TouchInputImplement(browserDelegate) {
        this.browserDelegate = browserDelegate;
    }
    Object.defineProperty(TouchInputImplement.prototype, "touchStart$", {
        get: function () { return this.browserDelegate.touchStart$; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TouchInputImplement.prototype, "touchEnd$", {
        get: function () { return this.browserDelegate.touchEnd$; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TouchInputImplement.prototype, "touchCancel$", {
        get: function () { return this.browserDelegate.touchCancel$; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TouchInputImplement.prototype, "touchMove$", {
        get: function () { return this.browserDelegate.touchMove$; },
        enumerable: true,
        configurable: true
    });
    TouchInputImplement = __decorate([
        Service_1.Service(TouchInput_1.TouchInput),
        __param(0, Inject_1.Inject(BrowserDelegate_1.BrowserDelegate)),
        __metadata("design:paramtypes", [Object])
    ], TouchInputImplement);
    return TouchInputImplement;
}());
exports.TouchInputImplement = TouchInputImplement;


/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var Observable_1 = __webpack_require__(3);
var MouseInput_1 = __webpack_require__(54);
var TouchInput_1 = __webpack_require__(55);
var DOM_1 = __webpack_require__(56);
var Vector_1 = __webpack_require__(1);
var Service_1 = __webpack_require__(2);
var PointerInput_1 = __webpack_require__(40);
var Inject_1 = __webpack_require__(0);
var PointerInputImplement = (function () {
    function PointerInputImplement(mouseInput, touchInput) {
        this.mouseInput = mouseInput;
        this.touchInput = touchInput;
    }
    Object.defineProperty(PointerInputImplement.prototype, "pointerStart$", {
        get: function () {
            var _this = this;
            return Observable_1.Observable.merge(this.mouseInput.mouseDown$.map(function (e) { return _this.parseMouseEvent(e); }), this.touchInput.touchStart$.map(function (e) { return _this.parseTouchEvent(e); }));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PointerInputImplement.prototype, "pointerEnd$", {
        get: function () {
            var _this = this;
            return Observable_1.Observable.merge(this.mouseInput.mouseUp$.map(function (e) { return _this.parseMouseEvent(e); }), this.touchInput.touchEnd$.map(function (e) { return _this.parseTouchEvent(e); }));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PointerInputImplement.prototype, "pointerMove$", {
        get: function () {
            var _this = this;
            return Observable_1.Observable.merge(this.mouseInput.mouseMove$.map(function (e) { return _this.parseMouseEvent(e); }), this.touchInput.touchMove$.map(function (e) { return _this.parseTouchEvent(e); }));
        },
        enumerable: true,
        configurable: true
    });
    PointerInputImplement.prototype.parseMouseEvent = function (e) {
        return {
            altKey: e.altKey,
            ctrlKey: e.ctrlKey,
            shiftKey: e.shiftKey,
            metaKey: e.metaKey,
            locations: [Vector_1.Vector.Get(e.clientX, e.clientY)]
        };
    };
    PointerInputImplement.prototype.parseTouchEvent = function (e) {
        var locations = [];
        DOM_1.listToArray(e.touches).forEach(function (touch) {
            if (touch) {
                locations.push(Vector_1.Vector.Get(touch.clientX, touch.clientY));
            }
        });
        return {
            altKey: e.altKey,
            ctrlKey: e.ctrlKey,
            shiftKey: e.shiftKey,
            metaKey: e.metaKey,
            locations: locations
        };
    };
    PointerInputImplement = __decorate([
        Service_1.Service(PointerInput_1.PointerInput),
        __param(0, Inject_1.Inject(MouseInput_1.MouseInput)),
        __param(1, Inject_1.Inject(TouchInput_1.TouchInput)),
        __metadata("design:paramtypes", [Object, Object])
    ], PointerInputImplement);
    return PointerInputImplement;
}());
exports.PointerInputImplement = PointerInputImplement;


/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var RenderProcess_1 = __webpack_require__(57);
var RendererComponent_1 = __webpack_require__(8);
var Service_1 = __webpack_require__(2);
var Vector_1 = __webpack_require__(1);
var runtime_1 = __webpack_require__(12);
var Inject_1 = __webpack_require__(0);
var BrowserDelegate_1 = __webpack_require__(4);
var RenderProcessImplement = (function () {
    function RenderProcessImplement(browserDelegate) {
        this.browserDelegate = browserDelegate;
        this.width = 0;
        this.height = 0;
        this.caches = new Map();
    }
    RenderProcessImplement.prototype.useContext = function (ctx, width, height) {
        this.ctx = ctx;
        this.width = width;
        this.height = height;
    };
    RenderProcessImplement.prototype.render = function (camera, gameObjects) {
        var _this = this;
        if (!this.ctx) {
            return;
        }
        var ctx = this.ctx;
        var cache = this.getCache(camera);
        var _a = camera.rect, width = _a.width, height = _a.height;
        cache.canvas.width = width;
        cache.canvas.height = height;
        cache.ctx.clearRect(0, 0, width, height);
        cache.ctx.save();
        cache.ctx.fillStyle = camera.backgroundColor.toHexString();
        cache.ctx.fillRect(0, 0, this.width, this.height);
        cache.ctx.restore();
        cache.ctx.save();
        gameObjects.forEachChildren(function (gameObject) {
            if (gameObject.layer & camera.cullingMask) {
                _this.renderGameObject(cache.ctx, camera, gameObject);
            }
        });
        cache.ctx.restore();
        var _b = camera.rect.position, x = _b.x, y = _b.y;
        ctx.drawImage(cache.canvas, 0, 0, width, height, x, y, width, height);
    };
    RenderProcessImplement.prototype.renderGameObject = function (ctx, camera, gameObject) {
        var _this = this;
        var renderers = gameObject.getComponents(RendererComponent_1.RendererComponent);
        var _a = gameObject.transform, rotation = _a.rotation, scale = _a.scale, worldPosition = _a.position;
        var position = Vector_1.Vector.Get().copy(worldPosition);
        camera.toScreenMatrix.multiplyToPoint(position);
        renderers.forEach(function (renderer) {
            renderer.render();
            var image = renderer.canvas;
            var width = image.width, height = image.height;
            ctx.save();
            ctx.translate(position.x, position.y);
            ctx.rotate(-rotation);
            ctx.scale(scale.x, scale.y);
            ctx.drawImage(image, -width * 0.5, -height * 0.5, width, height);
            ctx.restore();
            runtime_1.ifdef(runtime_1.DEBUG_RENDERER, function () { return _this.drawDebugOutline(ctx, camera, renderer.bounds); });
        });
    };
    RenderProcessImplement.prototype.drawDebugOutline = function (ctx, camera, bounds) {
        var min = bounds.min, max = bounds.max;
        camera.toScreenMatrix.multiplyToPoint(min);
        camera.toScreenMatrix.multiplyToPoint(max);
        ctx.beginPath();
        ctx.moveTo(min.x, min.y);
        ctx.lineTo(max.x, min.y);
        ctx.lineTo(max.x, max.y);
        ctx.lineTo(min.x, max.y);
        ctx.lineTo(min.x, min.y);
        ctx.closePath();
        ctx.save();
        ctx.strokeStyle = '#f00';
        ctx.stroke();
        ctx.restore();
    };
    RenderProcessImplement.prototype.getCache = function (camera) {
        var cache = this.caches.get(camera);
        if (!cache) {
            var canvas = this.browserDelegate.createCanvas();
            var ctx = this.browserDelegate.getContext(canvas);
            cache = { canvas: canvas, ctx: ctx };
            this.caches.set(camera, cache);
        }
        return cache;
    };
    RenderProcessImplement = __decorate([
        Service_1.Service(RenderProcess_1.RenderProcess),
        __param(0, Inject_1.Inject(BrowserDelegate_1.BrowserDelegate)),
        __metadata("design:paramtypes", [Object])
    ], RenderProcessImplement);
    return RenderProcessImplement;
}());
exports.RenderProcessImplement = RenderProcessImplement;


/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Service_1 = __webpack_require__(2);
var CollisionContact_1 = __webpack_require__(106);
var CollisionJumpTable_1 = __webpack_require__(32);
var CollisionJumpTableImplement = (function () {
    function CollisionJumpTableImplement() {
    }
    CollisionJumpTableImplement.prototype.circleCircle = function (colliderA, colliderB) {
        var maxDistance = colliderA.calculatedRadius + colliderB.calculatedRadius;
        var positionA = colliderA.bounds.center;
        var positionB = colliderB.bounds.center;
        var distance = positionA.distanceTo(positionB);
        if (distance > maxDistance) {
            return;
        }
        var normal = positionB.clone().subtract(positionA).multiply(colliderA.radius / distance);
        var point = positionA.clone().add(normal);
        normal.normalize();
        var mtv = normal.clone().multiply(maxDistance - distance);
        return new CollisionContact_1.CollisionContact(colliderA, colliderB, mtv, point, normal);
    };
    CollisionJumpTableImplement.prototype.circlePolygon = function (colliderA, colliderB) {
        var positionA = colliderA.bounds.center;
        var positionB = colliderB.bounds.center;
        var minAxis = this.circleBoxSAT(colliderA, colliderB);
        if (!minAxis) {
            return;
        }
        var ab = positionB.clone().subtract(positionA);
        var hasSameDirection = minAxis.dot(ab) >= 0;
        if (!hasSameDirection) {
            minAxis.multiply(-1);
        }
        var normal = minAxis.clone().normalize();
        var pointA = colliderA.getFurthestPoint(minAxis);
        var pointB = colliderB.getFurthestPoint(minAxis);
        var containsPointA = colliderB.contains(pointA);
        var containsPointB = colliderA.contains(pointB);
        var contactPoint;
        if (containsPointA && containsPointB) {
            contactPoint = pointA.add(pointB).multiply(0.5);
        }
        else if (containsPointA) {
            contactPoint = pointA;
        }
        else if (containsPointB) {
            contactPoint = pointB;
        }
        else {
            contactPoint = pointA.add(pointB).multiply(0.5);
        }
        return new CollisionContact_1.CollisionContact(colliderA, colliderB, minAxis, contactPoint, normal);
    };
    CollisionJumpTableImplement.prototype.polygonPolygon = function (colliderA, colliderB) {
        var positionA = colliderA.bounds.center;
        var positionB = colliderB.bounds.center;
        var minAxis = this.polygonPolygonSAT(colliderA, colliderB);
        if (!minAxis) {
            return;
        }
        var ab = positionB.clone().subtract(positionA);
        var hasSameDirection = minAxis.dot(ab) >= 0;
        if (!hasSameDirection) {
            minAxis.multiply(-1);
        }
        var normal = minAxis.clone().normalize();
        var pointA = colliderA.getFurthestPoint(minAxis);
        var pointB = colliderB.getFurthestPoint(minAxis);
        var containsPointA = colliderB.contains(pointA);
        var containsPointB = colliderA.contains(pointB);
        var contactPoint;
        if (containsPointA && containsPointB) {
            contactPoint = pointA.clone().add(pointB).multiply(0.5);
        }
        else if (containsPointA) {
            contactPoint = pointA.clone();
        }
        else if (containsPointB) {
            contactPoint = pointB.clone();
        }
        else {
            contactPoint = pointA.clone().add(pointB).multiply(0.5);
        }
        return new CollisionContact_1.CollisionContact(colliderA, colliderB, minAxis, contactPoint, normal);
    };
    CollisionJumpTableImplement.prototype.polygonPolygonSAT = function (colliderA, colliderB) {
        var axes = colliderA.calculatedAxes.concat(colliderB.calculatedAxes).map(function (axis) { return axis.normal(); });
        return this.findMTV(colliderA, colliderB, axes);
    };
    CollisionJumpTableImplement.prototype.circleBoxSAT = function (colliderA, colliderB) {
        var positionA = colliderA.bounds.center;
        var positionB = colliderB.bounds.center;
        var ba = positionA.clone().subtract(positionB);
        var closestPointOnPoly = colliderB.getFurthestPoint(ba);
        var axes = colliderB.calculatedAxes.map(function (axis) { return axis.normal(); }).concat([positionA.clone().subtract(closestPointOnPoly).normalize()]);
        return this.findMTV(colliderA, colliderB, axes);
    };
    CollisionJumpTableImplement.prototype.findMTV = function (colliderA, colliderB, axes) {
        var count = axes.length;
        var minOverlap = Number.MAX_VALUE;
        var minIndex = -1;
        for (var i = 0; i < count; i++) {
            var projectionA = colliderA.project(axes[i]);
            var projectionB = colliderB.project(axes[i]);
            var overlap = projectionA.getOverlap(projectionB);
            if (overlap <= 0) {
                return;
            }
            else {
                if (overlap < minOverlap) {
                    minOverlap = overlap;
                    minIndex = i;
                }
            }
        }
        if (minIndex === -1) {
            return;
        }
        if (axes[minIndex].isZero) {
            return;
        }
        return axes[minIndex].clone().normalize().multiply(minOverlap);
    };
    CollisionJumpTableImplement = __decorate([
        Service_1.Service(CollisionJumpTable_1.CollisionJumpTable)
    ], CollisionJumpTableImplement);
    return CollisionJumpTableImplement;
}());
exports.CollisionJumpTableImplement = CollisionJumpTableImplement;


/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Vector_1 = __webpack_require__(1);
var ForceMode_1 = __webpack_require__(31);
var CollisionContact = (function () {
    function CollisionContact(colliderA, colliderB, mtv, point, normal) {
        this.colliderA = colliderA;
        this.colliderB = colliderB;
        this.mtv = mtv;
        this.point = point;
        this.normal = normal;
        this._canRecycle = false;
        this._resolved = false;
    }
    Object.defineProperty(CollisionContact.prototype, "canRecycle", {
        get: function () { return this._canRecycle; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CollisionContact.prototype, "resolved", {
        get: function () { return this._resolved; },
        enumerable: true,
        configurable: true
    });
    CollisionContact.prototype.resolve = function () {
        if (this._resolved) {
            return;
        }
        var a = this.colliderA;
        var b = this.colliderB;
        var bodyA = a.rigidbody;
        var bodyB = b.rigidbody;
        var shouldAwakeBodyA = bodyB ? !bodyB.isSleeping : false;
        var shouldAwakeBodyB = bodyA ? !bodyA.isSleeping : false;
        if (!bodyA && !bodyB) {
            return;
        }
        var velocityA = bodyA ? bodyA.velocity : Vector_1.Vector.Zero;
        var velocityB = bodyB ? bodyB.velocity : Vector_1.Vector.Zero;
        var angularVelocityA = bodyA ? bodyA.angularVelocity : 0;
        var angularVelocityB = bodyB ? bodyB.angularVelocity : 0;
        var relativeA = this.point.clone().subtract(a.bounds.center);
        var relativeB = this.point.clone().subtract(b.bounds.center);
        var relativeVelocity = velocityB.clone()
            .add(relativeB.cross(-angularVelocityB))
            .subtract(velocityA)
            .subtract(relativeA.cross(-angularVelocityA));
        var rvDotNormal = relativeVelocity.dot(this.normal);
        if (rvDotNormal > 0) {
            return;
        }
        var restitution = Math.min(this.colliderA.restitution, this.colliderB.restitution);
        var inverseMassA = bodyA ? bodyA.inverseMass : 0;
        var inverseMassB = bodyB ? bodyB.inverseMass : 0;
        var sumOfInverseMass = inverseMassA + inverseMassB;
        var inverseMoiA = bodyA ? bodyA.inverseMoi : 0;
        var inverseMoiB = bodyB ? bodyB.inverseMoi : 0;
        var j_moi_a = Vector_1.Vector.Cross(relativeA.cross(this.normal), relativeA).multiply(inverseMoiA);
        var j_moi_b = Vector_1.Vector.Cross(relativeB.cross(this.normal), relativeB).multiply(inverseMoiB);
        var j_moi = j_moi_a.add(j_moi_b).dot(this.normal);
        var j = -(1 + restitution) * rvDotNormal / (sumOfInverseMass + j_moi);
        var impulse = this.normal.clone().multiply(j);
        if (bodyA && bodyB) {
            this.mtv.multiply(0.5);
        }
        if (bodyA) {
            if (shouldAwakeBodyA && bodyA.isSleeping) {
                bodyA.awake();
            }
            bodyA.host.transform.position.add(this.mtv.clone().multiply(-1));
            bodyA.addForce(impulse.clone().multiply(-1), ForceMode_1.ForceMode.Impulse);
        }
        if (bodyB) {
            if (shouldAwakeBodyB && bodyB.isSleeping) {
                bodyB.awake();
            }
            bodyB.host.transform.position.add(this.mtv);
            bodyB.addForce(impulse, ForceMode_1.ForceMode.Impulse);
        }
        var tangent = this.normal.normal();
        var frictionImpulse;
        var jt_moi_a = Vector_1.Vector.Cross(relativeA.cross(tangent), relativeA).multiply(inverseMoiA);
        var jt_moi_b = Vector_1.Vector.Cross(relativeB.cross(tangent), relativeB).multiply(inverseMoiB);
        var jt_moi = jt_moi_a.add(jt_moi_b).dot(tangent);
        var t = relativeVelocity.clone().subtract(this.normal.clone().multiply(rvDotNormal)).normalize();
        var jt = -relativeVelocity.dot(t) / (sumOfInverseMass + jt_moi);
        var mu = Math.sqrt(Math.pow(this.colliderA.friction, 2) + Math.pow(this.colliderB.friction, 2));
        if (Math.abs(jt) < j * mu) {
            frictionImpulse = t.clone().multiply(jt);
        }
        else {
            frictionImpulse = t.clone().multiply(-j * mu);
        }
        if (bodyA) {
            bodyA.addForce(frictionImpulse.clone().multiply(-1), ForceMode_1.ForceMode.Impulse);
            bodyA.addTorque(-frictionImpulse.dot(t) * relativeA.cross(t), ForceMode_1.ForceMode.Impulse);
        }
        if (bodyB) {
            bodyB.addForce(frictionImpulse, ForceMode_1.ForceMode.Impulse);
            bodyB.addTorque(frictionImpulse.dot(t) * relativeB.cross(t), ForceMode_1.ForceMode.Impulse);
        }
    };
    CollisionContact.prototype.destroy = function () {
        this._canRecycle = true;
    };
    return CollisionContact;
}());
exports.CollisionContact = CollisionContact;


/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var ArrayUtility_1 = __webpack_require__(5);
var Pair_1 = __webpack_require__(108);
var Service_1 = __webpack_require__(2);
var BroadPhaseCollisionResolver_1 = __webpack_require__(42);
var Vector_1 = __webpack_require__(1);
var Color_1 = __webpack_require__(7);
var Ray_1 = __webpack_require__(60);
var BroadPhaseCollisionResolverImplement = (function () {
    function BroadPhaseCollisionResolverImplement() {
        this.awakeColliders = [];
        this.sleepingColliders = [];
        this._pairs = [];
    }
    Object.defineProperty(BroadPhaseCollisionResolverImplement.prototype, "pairs", {
        get: function () { return this._pairs; },
        enumerable: true,
        configurable: true
    });
    BroadPhaseCollisionResolverImplement.prototype.track = function (collider) {
        if (collider.rigidbody && !collider.rigidbody.isSleeping) {
            return ArrayUtility_1.addToArray(this.awakeColliders, collider);
        }
        else {
            return ArrayUtility_1.addToArray(this.sleepingColliders, collider);
        }
    };
    BroadPhaseCollisionResolverImplement.prototype.untrack = function (collider) {
        if (ArrayUtility_1.removeFromArray(this.awakeColliders, collider)) {
            return true;
        }
        return ArrayUtility_1.removeFromArray(this.sleepingColliders, collider);
    };
    BroadPhaseCollisionResolverImplement.prototype.fixedUpdate = function () {
        this._pairs.forEach(function (pair) { return Pair_1.Pair.Put(pair); });
        this._pairs.splice(0, this._pairs.length);
        var awakeLength = this.awakeColliders.length;
        var sleepingLength = this.sleepingColliders.length;
        var colliderA;
        var colliderB;
        for (var a = 0; a < awakeLength; a++) {
            colliderA = this.awakeColliders[a];
            if (!colliderA.host.isActive) {
                continue;
            }
            for (var b = a + 1; b < awakeLength; b++) {
                colliderB = this.awakeColliders[b];
                if (!colliderB.host.isActive) {
                    continue;
                }
                if ((colliderA.layer & colliderB.layer) === 0) {
                    continue;
                }
                if (colliderA.bounds.intersects(colliderB.bounds)) {
                    var pair = Pair_1.Pair.Get(colliderA, colliderB);
                    if (pair) {
                        this._pairs.push(pair);
                    }
                }
            }
            for (var b = 0; b < sleepingLength; b++) {
                colliderB = this.sleepingColliders[b];
                if (!colliderB.host.isActive) {
                    continue;
                }
                if ((colliderA.layer & colliderB.layer) === 0) {
                    continue;
                }
                if (colliderA.bounds.intersects(colliderB.bounds)) {
                    var pair = Pair_1.Pair.Get(colliderA, colliderB);
                    if (pair) {
                        this._pairs.push(pair);
                    }
                }
            }
        }
    };
    BroadPhaseCollisionResolverImplement.prototype.update = function () {
        var _this = this;
        var goToSleep = this.awakeColliders.filter(function (collider) { return collider.rigidbody && collider.rigidbody.isSleeping; });
        goToSleep.forEach(function (collider) {
            ArrayUtility_1.removeFromArray(_this.awakeColliders, collider);
            ArrayUtility_1.addToArray(_this.sleepingColliders, collider);
        });
        var goToAwake = this.sleepingColliders.filter(function (collider) { return collider.rigidbody && !collider.rigidbody.isSleeping; });
        goToAwake.forEach(function (collider) {
            ArrayUtility_1.removeFromArray(_this.sleepingColliders, collider);
            ArrayUtility_1.addToArray(_this.awakeColliders, collider);
        });
        this._pairs.forEach(function (pair) { return Pair_1.Pair.Put(pair); });
        this._pairs.splice(0, this._pairs.length);
    };
    BroadPhaseCollisionResolverImplement.prototype.debugRender = function (ctx, camera) {
        var _this = this;
        this.awakeColliders.forEach(function (collider) {
            if (collider.bounds.intersects(camera.bounds)) {
                _this.debugRenderCollider(ctx, camera, collider, Color_1.Color.Red);
            }
        });
        this.sleepingColliders.forEach(function (collider) {
            if (collider.bounds.intersects(camera.bounds)) {
                _this.debugRenderCollider(ctx, camera, collider, Color_1.Color.Cyan);
            }
        });
    };
    BroadPhaseCollisionResolverImplement.prototype.debugRenderCollider = function (ctx, camera, collider, color) {
        var rigidbody = collider.rigidbody;
        var bounds = collider.bounds;
        var points = [
            Vector_1.Vector.Get().copy(bounds.center).add(bounds.extents.x, bounds.extents.y),
            Vector_1.Vector.Get().copy(bounds.center).add(bounds.extents.x, -bounds.extents.y),
            Vector_1.Vector.Get().copy(bounds.center).add(-bounds.extents.x, -bounds.extents.y),
            Vector_1.Vector.Get().copy(bounds.center).add(-bounds.extents.x, bounds.extents.y)
        ];
        points.forEach(function (p) { return camera.toScreenMatrix.multiplyToPoint(p); });
        ctx.save();
        ctx.strokeStyle = color.toHexString();
        ctx.beginPath();
        ctx.moveTo(points[3].x, points[3].y);
        for (var i = 0; i < 4; i++) {
            ctx.lineTo(points[i].x, points[i].y);
        }
        ctx.closePath();
        ctx.stroke();
        points.forEach(function (p) { return Vector_1.Vector.Put(p); });
        points.splice(0, 4);
        var rotation = collider.transform.rotation;
        var direction = Vector_1.Vector.Get(1, 0).rotate(rotation);
        var ray = new Ray_1.Ray(bounds.center, direction);
        var point = collider.rayCast(ray) || direction;
        var center = Vector_1.Vector.Get().copy(bounds.center);
        camera.toScreenMatrix.multiplyToPoint(point);
        camera.toScreenMatrix.multiplyToPoint(center);
        ctx.beginPath();
        ctx.moveTo(center.x, center.y);
        ctx.lineTo(point.x, point.y);
        ctx.closePath();
        ctx.stroke();
        Vector_1.Vector.Put(point);
        Vector_1.Vector.Put(center);
        ctx.restore();
    };
    BroadPhaseCollisionResolverImplement = __decorate([
        Service_1.Service(BroadPhaseCollisionResolver_1.BroadPhaseCollisionResolver)
    ], BroadPhaseCollisionResolverImplement);
    return BroadPhaseCollisionResolverImplement;
}());
exports.BroadPhaseCollisionResolverImplement = BroadPhaseCollisionResolverImplement;


/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Pool_1 = __webpack_require__(52);
var Pair = (function () {
    function Pair(_bodyA, _bodyB) {
        this._bodyA = _bodyA;
        this._bodyB = _bodyB;
    }
    Pair.Get = function (colliderA, colliderB) {
        return this.Instances.get(colliderA, colliderB);
    };
    Pair.Put = function (pair) { this.Instances.put(pair); };
    Object.defineProperty(Pair.prototype, "canRecycle", {
        get: function () { return this._canRecycle; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Pair.prototype, "bodyA", {
        get: function () { return this._bodyA; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Pair.prototype, "bodyB", {
        get: function () { return this._bodyB; },
        enumerable: true,
        configurable: true
    });
    Pair.prototype.reset = function (bodyA, bodyB) {
        this._bodyA = bodyA;
        this._bodyB = bodyB;
    };
    Pair.prototype.destroy = function () {
        this._canRecycle = true;
    };
    Pair.Instances = new Pool_1.Pool(Pair);
    return Pair;
}());
exports.Pair = Pair;


/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Service_1 = __webpack_require__(2);
var NarrowPhaseCollisionResolver_1 = __webpack_require__(61);
var NarrowPhaseCollisionResolverImplement = (function () {
    function NarrowPhaseCollisionResolverImplement() {
    }
    NarrowPhaseCollisionResolverImplement.prototype.resolve = function (pairs) {
        var _this = this;
        pairs.forEach(function (pair) { return _this.resolvePair(pair); });
    };
    NarrowPhaseCollisionResolverImplement.prototype.resolvePair = function (pair) {
        var bodyA = pair.bodyA, bodyB = pair.bodyB;
        var collisionConctact = bodyA.collide(bodyB);
        if (collisionConctact) {
            collisionConctact.resolve();
        }
    };
    NarrowPhaseCollisionResolverImplement = __decorate([
        Service_1.Service(NarrowPhaseCollisionResolver_1.NarrowPhaseCollisionResolver)
    ], NarrowPhaseCollisionResolverImplement);
    return NarrowPhaseCollisionResolverImplement;
}());
exports.NarrowPhaseCollisionResolverImplement = NarrowPhaseCollisionResolverImplement;


/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Service_1 = __webpack_require__(2);
var Time_1 = __webpack_require__(20);
var TimeImplement = (function () {
    function TimeImplement() {
        this.deltaTime = 0;
        this.fixedDeltaTime = 1000 / 60;
        this.fixedDeltaTimeInSecond = 1 / 60;
    }
    TimeImplement.prototype.tick = function (deltaTime) {
        this.deltaTime = deltaTime;
    };
    TimeImplement = __decorate([
        Service_1.Service(Time_1.Time)
    ], TimeImplement);
    return TimeImplement;
}());
exports.TimeImplement = TimeImplement;


/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var Observable_1 = __webpack_require__(3);
var Service_1 = __webpack_require__(2);
var BrowserDelegate_1 = __webpack_require__(4);
var BrowserDelegateImplement = (function () {
    function BrowserDelegateImplement() {
        this.window = window;
        this.document = this.window.document;
        this.screen = window.screen;
        this.resize$ = Observable_1.Observable.fromEvent(this.window, 'resize');
        this.click$ = Observable_1.Observable.fromEvent(this.window, 'click');
        this.mouseMove$ = Observable_1.Observable.fromEvent(this.window, 'mousemove');
        this.mouseDown$ = Observable_1.Observable.fromEvent(this.window, 'mousedown');
        this.mouseUp$ = Observable_1.Observable.fromEvent(this.window, 'mouseup');
        this.wheel$ = Observable_1.Observable.fromEvent(this.window, 'wheel');
        this.keyDown$ = Observable_1.Observable.fromEvent(this.window, 'keydown');
        this.keyUp$ = Observable_1.Observable.fromEvent(this.window, 'keyup');
        this.touchStart$ = Observable_1.Observable.fromEvent(this.window, 'touchstart');
        this.touchEnd$ = Observable_1.Observable.fromEvent(this.window, 'touchend');
        this.touchCancel$ = Observable_1.Observable.fromEvent(this.window, 'touchcancel');
        this.touchMove$ = Observable_1.Observable.fromEvent(this.window, 'touchmove');
        this.document.body.style.margin = '0';
        this.document.body.style.width = '100%';
        this.document.body.style.height = '100%';
        this.document.body.style.overflow = 'auto';
    }
    BrowserDelegateImplement.prototype.createCanvas = function () {
        return this.document.createElement('canvas');
    };
    BrowserDelegateImplement.prototype.getContext = function (canvas) {
        return canvas.getContext('2d');
    };
    BrowserDelegateImplement = __decorate([
        Service_1.Service(BrowserDelegate_1.BrowserDelegate),
        __metadata("design:paramtypes", [])
    ], BrowserDelegateImplement);
    return BrowserDelegateImplement;
}());
exports.BrowserDelegateImplement = BrowserDelegateImplement;


/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var Resource_1 = __webpack_require__(62);
var ArrayUtility_1 = __webpack_require__(5);
var Bundle = (function (_super) {
    __extends(Bundle, _super);
    function Bundle(resources) {
        if (resources === void 0) { resources = []; }
        var _this = _super.call(this) || this;
        _this.resources = resources;
        return _this;
    }
    Bundle.prototype.add = function (resource) {
        if (ArrayUtility_1.addToArray(this.resources, resource)) {
            this._isLoaded.next(false);
        }
    };
    Bundle.prototype.load = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.isLoaded) {
                            return [2];
                        }
                        return [4, Promise.all(this.resources.map(function (resource) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                                return [2, resource.load()];
                            }); }); }))];
                    case 1:
                        _a.sent();
                        this._isLoaded.next(true);
                        return [2];
                }
            });
        });
    };
    return Bundle;
}(Resource_1.Resource));
exports.Bundle = Bundle;


/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subject_1 = __webpack_require__(38);
var ObjectUnsubscribedError_1 = __webpack_require__(53);
/**
 * @class BehaviorSubject<T>
 */
var BehaviorSubject = (function (_super) {
    __extends(BehaviorSubject, _super);
    function BehaviorSubject(_value) {
        _super.call(this);
        this._value = _value;
    }
    Object.defineProperty(BehaviorSubject.prototype, "value", {
        get: function () {
            return this.getValue();
        },
        enumerable: true,
        configurable: true
    });
    BehaviorSubject.prototype._subscribe = function (subscriber) {
        var subscription = _super.prototype._subscribe.call(this, subscriber);
        if (subscription && !subscription.closed) {
            subscriber.next(this._value);
        }
        return subscription;
    };
    BehaviorSubject.prototype.getValue = function () {
        if (this.hasError) {
            throw this.thrownError;
        }
        else if (this.closed) {
            throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
        }
        else {
            return this._value;
        }
    };
    BehaviorSubject.prototype.next = function (value) {
        _super.prototype.next.call(this, this._value = value);
    };
    return BehaviorSubject;
}(Subject_1.Subject));
exports.BehaviorSubject = BehaviorSubject;
//# sourceMappingURL=BehaviorSubject.js.map

/***/ })
/******/ ]);
//# sourceMappingURL=commons.bundle.js.map