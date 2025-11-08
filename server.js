/********************************************************************************
 * WEB322 – Assignment 01
 *
 * I declare that this assignment is my own work in accordance with Seneca's
 * Academic Integrity Policy:
 *
 * https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
 *
 * Name: Arash_Kheirollahi_____ Student ID: 146731245_____ Date: 2025_10_03____
 *
 ********************************************************************************/

const projectData = require("./modules/projects");

const express = require("express");
const path = require("path");
const { json } = require("stream/consumers");
const projects = require("./modules/projects");
const app = express();

const HTTP_PORT = process.env.PORT || 8080;

projectData
	.initialize()
	.then(() => {
		const pages = [
			{ title: "Home", address: "/" },
			{ title: "About", address: "/about" },
		];

		const sectors = [
			"Land Sinks",
			"Industry",
			"Transportation",
			"Electricity",
			"Food, Agriculture, and Land Use",
		];

		app.set("view engine", "ejs");
		app.use(express.static("public"));
		app.use(express.urlencoded({ extended: true }));

		app.use((req, res, next) => {
			res.locals.sectors = sectors;
			res.locals.pages = pages;
			next();
		});

		app.get("/", async (request, response) => {
			try {
				const projects = await projectData.getAllProjects();
				const randomProjects = projects.sort(() => Math.random() - 0.5).slice(0, 3);

				response.render("home", {
					currentTitle: "Home",
					projects: randomProjects,
				});
			} catch (error) {
				response.status(500).send(error.toString());
			}
		});
		app.get("/about", (request, response) => {
			response.render("about", {
				currentTitle: "About",
			});
		});

		// app.get("/solutions/projects", async (request, response) => {
		// 	try {
		// 		const projects = await projectData.getAllProjects();
		// 		response.json(projects);
		// 	} catch (error) {
		// 		response.status(500).send(error.toString());
		// 	}
		// });

		app.get("/solutions/projects/:id", async (request, response) => {
			try {
				const singleProj = await projectData.getProjectById(request.params.id);
				response.render("project", {
					currentTitle: "Project",
					project: singleProj,
				});
			} catch (error) {
				response.status(404).render("404", { message: error });
			}
		});

		app.get("/solutions/projects", async (req, res) => {
			try {
				if (req.query.sector) {
					// ✅ Decode URL-encoded spaces (%20) and other characters
					const sector = decodeURIComponent(req.query.sector);

					const projects = await projectData.getProjectsBySector(sector);

					if (projects && projects.length > 0) {
						res.render("projects", {
							currentTitle: "Projects",
							projects: projects,
						});
					} else {
						res.status(404).render("404", {
							message: `No projects found for sector: ${sector}`,
						});
					}
				} else {
					const projects = await projectData.getAllProjects();
					res.render("projects", {
						currentTitle: "Projects",
						projects: projects,
					});
				}
			} catch (err) {
				console.error(err);
				res.status(500).render("404", { message: err.message || "Internal Server Error" });
			}
		});

		app.use((req, res) => {
			res.status(404).render("404", {
				currentTitle: "404",
				message: "Where are my contacts, I can't find anything!!!",
			});
		});

		app.listen(HTTP_PORT, () => {
			console.log(`server listening on port http://localhost:${HTTP_PORT}`);
		});
	})
	.catch((err) => {
		console.error("Could not get data from the provid/er.", err);
	});
