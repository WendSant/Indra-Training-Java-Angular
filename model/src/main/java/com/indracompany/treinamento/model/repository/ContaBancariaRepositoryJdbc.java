package com.indracompany.treinamento.model.repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import com.indracompany.treinamento.model.entity.ContaBancaria;

@Repository
public class ContaBancariaRepositoryJdbc {
	
	@Autowired
	private JdbcTemplate jdbcTemplate;

	
	public List<ContaBancaria> buscarContasPorAgenciaouNumero(String agencia, String numeroConta){
		
		StringBuilder sql = new StringBuilder("select c.* from contas c ");
		
		if (agencia!= null && !agencia.isBlank()) {
			sql.append(" and c.agencia = ?");
		}
		
		if (numeroConta != null && !numeroConta.isBlank()) {
			sql.append(" and c.numero = ? ");
		}
		
		return jdbcTemplate.query(sql.toString(), new ContaRowMapper(), agencia, numeroConta);
	}
	
	private class ContaRowMapper implements RowMapper<ContaBancaria>{

		@Override
		public ContaBancaria mapRow(ResultSet rs, int rowNum) throws SQLException {
			ContaBancaria conta = new ContaBancaria();
			conta.setId(rs.getLong("id"));
			conta.setAgencia(rs.getString("agencia"));
			conta.setNumero(rs.getString("numero"));
			conta.setSaldo(rs.getDouble("saldo"));
			return conta;
		}
		
	}
}
