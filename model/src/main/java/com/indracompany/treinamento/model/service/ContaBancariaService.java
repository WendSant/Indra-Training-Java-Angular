package com.indracompany.treinamento.model.service;

import java.util.ArrayList;
import java.util.List;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.indracompany.treinamento.exception.AplicacaoException;
import com.indracompany.treinamento.exception.ExceptionValidacoes;
import com.indracompany.treinamento.model.dto.ConsultaContaBancariaDTO;
import com.indracompany.treinamento.model.dto.TransferenciaBancariaDTO;
import com.indracompany.treinamento.model.entity.Cliente;
import com.indracompany.treinamento.model.entity.ContaBancaria;
import com.indracompany.treinamento.model.entity.OperacaoConta;
import com.indracompany.treinamento.model.repository.ContaBancariaRepository;
import com.indracompany.treinamento.model.repository.OpContaRepository;


@Service
public class ContaBancariaService extends GenericCrudService<ContaBancaria, Long, ContaBancariaRepository>{
	
	@Autowired
	private ClienteService clienteService;
	@Autowired
	private OpContaRepository opContaRepository;
	@Autowired
	private ContaBancariaRepository contaBancariaRepository;
	
	public double consultarSaldo(String agencia, String numero) {
		ContaBancaria c = consultarConta(agencia, numero);
		return c.getSaldo();
	}
	public void registrarOperacao(String agencia, String numeroConta, double valor, char tpOperacao,
			ContaBancaria conta) {
		LocalDateTime dataHora = LocalDateTime.now();
		OperacaoConta op = new OperacaoConta();
		op.setDataHora(dataHora);
		op.setConta(conta);
		if (Character.toUpperCase(tpOperacao) == 'C') {
			op.setTpOperacao('C');
			op.setObservacao("Tipo de operação: Crédito.");
		} else {
			op.setObservacao("Tipo de operação: Débito.");
			op.setTpOperacao('D');
		}
		op.setValor(valor);
		op.setConta(conta);
		opContaRepository.save(op);
	}

	public void depositar (String agencia, String numeroConta, double valor) {
		ContaBancaria conta = consultarConta(agencia, numeroConta);
		conta.setSaldo(conta.getSaldo() + valor);
		this.registrarOperacao(agencia, numeroConta, valor, 'C', conta);
		super.salvar(conta);
	}
	
	public void sacar (String agencia, String numeroConta, double valor) {
		ContaBancaria conta = consultarConta(agencia, numeroConta);
		
		if (conta.getSaldo() < valor) {
			throw new AplicacaoException(ExceptionValidacoes.ERRO_SALDO_INEXISTENTE);
		}
		
		conta.setSaldo(conta.getSaldo() - valor);
		this.registrarOperacao(agencia, numeroConta, valor, 'D', conta);
		super.salvar(conta);
	}
	
	@Transactional(rollbackFor = Exception.class)
	public void transferir(TransferenciaBancariaDTO dto) {
		this.sacar(dto.getAgenciaOrigem(), dto.getNumeroContaOrigem(), dto.getValor());
		this.depositar(dto.getAgenciaDestino(), dto.getNumeroContaDestino(), dto.getValor());
	}
	
	public ContaBancaria consultarConta (String agencia, String numeroConta) {
		ContaBancaria c = repository.findByAgenciaAndNumero(agencia, numeroConta);
		
		if (c == null) {
			throw new AplicacaoException(ExceptionValidacoes.ERRO_CONTA_INVALIDA);
		}
		
		return c;
	}
	
	public List<ConsultaContaBancariaDTO> obterContasPorCpf(String cpf){

		List<ConsultaContaBancariaDTO> listaContasRetorno = new ArrayList<>();
		Cliente cli = clienteService.buscarCliente(cpf);

		List<ContaBancaria> listaContasCliente = repository.findByCliente(cli);
		for (ContaBancaria conta : listaContasCliente) {
			ConsultaContaBancariaDTO dtoConta = new ConsultaContaBancariaDTO();
			BeanUtils.copyProperties(conta, dtoConta);
			listaContasRetorno.add(dtoConta);
		}


		return listaContasRetorno;
	}
	public List<OperacaoConta> extratoConta(String agencia, String numero) {
		ContaBancaria conta = consultarConta(agencia, numero);
		List<OperacaoConta> resultado = opContaRepository.findByConta(conta);
		return resultado;
	}



	public List<OperacaoConta> extratoContaPeriodoRepository(String agencia, String numero, String inicio, String fim) {
		ContaBancaria conta = consultarConta(agencia, numero);
		DateTimeFormatter parser = DateTimeFormatter.ofPattern("dd-MM-yyyy");
		LocalDateTime dataInicio = LocalDate.parse(inicio, parser).atStartOfDay();
		LocalDateTime dataFim = LocalDate.parse(fim, parser).atTime(23, 59, 59);
		List<OperacaoConta> resultado = opContaRepository.findByContaAndDataHoraBetween(conta, dataInicio,
				dataFim);
		return resultado;
	}
	
}
