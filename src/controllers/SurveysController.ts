import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SurveysRepository } from "../repositories/SurveysRepository";

class SurveysController {
  async create(request: Request, response: Response) {
    // Como é o mesmo nome de atributo/variável, não precisa fazer atribuição
    // Desestruturação:
    const { title, description } = request.body;

    const surveysRepository = getCustomRepository(SurveysRepository);

    const survey = surveysRepository.create({
      title: title,
      description: description,
      //   title,
      //   description,
    });

    await surveysRepository.save(survey); // Como retorna um Promise, precisa usar o await
    return response.status(201).json(survey);
  }

  async show(request: Request, response: Response) {
    const surveysRepository = getCustomRepository(SurveysRepository);

    const all = await surveysRepository.find();

    return response.json(all);
  }
}

export { SurveysController };
