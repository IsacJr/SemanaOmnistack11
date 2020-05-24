const connection = require('../database/connection');

module.exports = {

    async index (request, response) {
        const { page = 1 } = request.query;
        
        const [count] = await connection('incidents').count();

        const incidents = await connection('incidents').select('*')
            .join('ongs', 'ongs_id', '=', 'incidents.ong_id')
            .limit(5)
            .offset((page - 1) * 5)
            .select([
                'incidents.*',
                'ongs.name',
                'ongs.email',
                'ongs.whatsapp',
                'ongs.city',
                'ongs.uf'
            ]);

        response.headers('X-Total-Count', count['count(*)']);

        return response.json(incidents);
    },

    async create (request, response) {
        const { title, description, value } = request.body;
        const ong_id = request.headers.authorization;

        const [id] = await connection('incidents').insert({
            description,
            ong_id,
            title,
            value
        });

        return response.json({ id });
    },

    async delete (request, response) {
        const ong_id = request.headers.authorization;
        const { id } = request.params;

        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first();

        if(incident.ong_id !== ong_id){
            return response.status(401).json({ error: 'Operation not permitted.' });
        }

        const incident_delete_response = await connection('incidents').where('id', id).delete();

        if(incident_delete_response === {})
            return response.status(204).send();
        
        return response.json({ id })
    }
}