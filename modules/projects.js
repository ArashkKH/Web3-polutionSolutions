/**
 * @file projects.js
 * @description Objective: Create and publish a web app that uses multiple routes which serve static content (text / json) as well as create a "project service" module for accessing data. For this assignment, we will initially use data from https://drawdown.org (specifically, data related to some of their projects / solutions for solving climate change).
 * @author Arash Kheirollahi
 * @studentID 416731245
 * @course WEB322 - Web Programming Principles
 * @section NAA
 * @assignment 1
 * @date 2025-10-03
 */

const projectData = require("../data/projectData");
const sectorData = require("../data/sectorData");
let projects = [];

module.exports = {
	/**
	 * @description The purpose of this function is to fill the "projects" array (declared above), by adding copies of all the projectData objects.
	 */
	initialize: () => {
		return new Promise((res, rej) => {
			try {
				projects = projectData.map((p) => {
					p.sector = sectorData.find((sec) => sec.id === p.sector_id).sector_name;
					return p;
				});
				res();
			} catch (error) {
				rej("Initialization: Error - Something went wrong", error);
			}
		});
	},

	/**
	 * This function simply returns the complete "projects" array
	 */
	getAllProjects: () => {
		return new Promise((resolve, reject) => {
			try {
				resolve(projects);
			} catch (error) {
				reject("getAllProjects: Error - Something went wrong", error);
			}
		});
	},

	/**
	 * This function will return a specific "project" object from the "projects" array, whose "id" value matches the value of the "projectId" parameter
	 * @param {number} id
	 * @returns a project object with the matching ID
	 */
	getProjectById: (id) => {
		return new Promise((resolve, reject) => {
			try {
				let res = projects.find((p) => p.id == id);
				resolve(res);
			} catch (error) {
				reject("getProjectById: Error - Something went wrong", error);
			}
		});
	},

	/**
	 * The purpose of this function is to return an array of objects from the "projects" array whose "sector" value matches the "sector" parameter. However, it is important to note that the "sector" parameter may contain only part of the "sector" string, and case is ignored
	 * @param {string} sector
	 * @returns return an array of objects from the "projects" array
	 */
	getProjectsBySector: (sector) => {
		return new Promise((resolve, reject) => {
			try {
				const search = sector.toLowerCase();
				let res = projects.filter(
					(p) => p.sector && p.sector.toLowerCase().includes(search)
				);
				resolve(res);
			} catch (error) {
				reject("getProjectsBySector: Error - Something went wrong", error);
			}
		});
	},
};
