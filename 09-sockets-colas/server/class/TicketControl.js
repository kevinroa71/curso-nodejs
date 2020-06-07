const fs = require('fs');
const path = require('path');
const underscore = require('underscore');

class Ticket {
    constructor(numero, escritorio) {
        this.numero = numero;
        this.escritorio = escritorio;
    }
}

class TicketControl {
    constructor() {
        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = [];
        this.atendiendo = [];
        let data = require('../data/data.json');

        if (data.hoy != this.hoy) {
            this.guardarData();
        } else {
            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.atendiendo = data.atendiendo;
        }
    }

    siguienteTicket() {
        this.ultimo++;
        this.tickets.push(new Ticket(this.ultimo, null));
        this.guardarData();
        return `Ticket ${this.ultimo}`;
    }

    estadoActual() {
        return `Ticket ${this.ultimo}`;
    }

    estadoAtencion() {
        return this.atendiendo;
    }

    atenderTicket(escritorio) {
        if (this.tickets.length == 0)
            return "No hay tickets por atender";

        this.atendiendo = underscore.reject(this.atendiendo, function(item) {
            return item.escritorio == escritorio;
        });

        let ticket = this.tickets.shift();
        ticket.escritorio = escritorio;
        this.atendiendo.unshift(new Ticket(ticket.numero, ticket.escritorio));

        this.guardarData();
        return ticket;
    }

    guardarData() {
        let data = JSON.stringify({
            hoy: this.hoy,
            ultimo: this.ultimo,
            tickets: this.tickets,
            atendiendo: this.atendiendo
        });

        fs.writeFileSync(path.resolve(__dirname, '../data/data.json'), data);
    }
}

module.exports = {
    TicketControl
};
