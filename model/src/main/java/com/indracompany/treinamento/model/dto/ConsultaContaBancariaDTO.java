package com.indracompany.treinamento.model.dto;

import java.io.Serializable;

import com.indracompany.treinamento.model.entity.Cliente;

import lombok.Data;

@Data
public class ConsultaContaBancariaDTO implements Serializable{
	
	private static final long serialVersionUID = 7241234582609797095L;

	private Long id;
	
	private String agencia;
	
	private String numero;
	
	private double saldo;
	
	private String cpf;
	
	private Cliente cliente;

}
