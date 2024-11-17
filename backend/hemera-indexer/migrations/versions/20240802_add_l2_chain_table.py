"""Describe your changes here

Revision ID: e3a3e2114b9c
Revises: 040e5251f45d
Create Date: 2024-08-02 11:00:08.496753

"""

from typing import Sequence, Union

import sqlalchemy as sa
from alembic import op
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision: str = "e3a3e2114b9c"
down_revision: Union[str, None] = "040e5251f45d"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table(
        "arbitrum_state_batches",
        sa.Column("node_num", sa.INTEGER(), nullable=False),
        sa.Column("create_l1_block_number", sa.INTEGER(), nullable=True),
        sa.Column("create_l1_block_timestamp", postgresql.TIMESTAMP(), nullable=True),
        sa.Column("create_l1_block_hash", sa.VARCHAR(), nullable=True),
        sa.Column("create_l1_transaction_hash", sa.VARCHAR(), nullable=True),
        sa.Column("l1_block_number", sa.INTEGER(), nullable=True),
        sa.Column("l1_block_timestamp", postgresql.TIMESTAMP(), nullable=True),
        sa.Column("l1_block_hash", sa.VARCHAR(), nullable=True),
        sa.Column("l1_transaction_hash", sa.VARCHAR(), nullable=True),
        sa.Column("parent_node_hash", sa.VARCHAR(), nullable=True),
        sa.Column("node_hash", sa.VARCHAR(), nullable=True),
        sa.Column("block_hash", sa.VARCHAR(), nullable=True),
        sa.Column("send_root", sa.VARCHAR(), nullable=True),
        sa.Column("start_block_number", sa.INTEGER(), nullable=True),
        sa.Column("end_block_number", sa.INTEGER(), nullable=True),
        sa.Column("transaction_count", sa.INTEGER(), nullable=True),
        sa.Column("block_count", sa.INTEGER(), nullable=True),
        sa.PrimaryKeyConstraint("node_num"),
    )
    op.create_table(
        "arbitrum_transaction_batches",
        sa.Column("batch_index", sa.INTEGER(), nullable=False),
        sa.Column("l1_block_number", sa.INTEGER(), nullable=True),
        sa.Column("l1_block_timestamp", postgresql.TIMESTAMP(), nullable=True),
        sa.Column("l1_block_hash", sa.VARCHAR(), nullable=True),
        sa.Column("l1_transaction_hash", sa.VARCHAR(), nullable=True),
        sa.Column("batch_root", sa.VARCHAR(), nullable=True),
        sa.Column("start_block_number", sa.INTEGER(), nullable=True),
        sa.Column("end_block_number", sa.INTEGER(), nullable=True),
        sa.Column("transaction_count", sa.INTEGER(), nullable=True),
        sa.Column("block_count", sa.INTEGER(), nullable=True),
        sa.PrimaryKeyConstraint("batch_index"),
    )
    op.create_table(
        "bridge_tokens",
        sa.Column("l1_token_address", postgresql.BYTEA(), nullable=False),
        sa.Column("l2_token_address", postgresql.BYTEA(), nullable=False),
        sa.PrimaryKeyConstraint("l1_token_address", "l2_token_address"),
    )
    op.create_table(
        "data_store_tx_mapping",
        sa.Column("data_store_id", sa.INTEGER(), nullable=False),
        sa.Column("index", sa.INTEGER(), nullable=False),
        sa.Column("block_number", sa.INTEGER(), nullable=True),
        sa.Column("transaction_hash", sa.VARCHAR(), nullable=True),
        sa.PrimaryKeyConstraint("data_store_id", "index"),
    )
    op.create_table(
        "data_stores",
        sa.Column("id", sa.INTEGER(), nullable=False),
        sa.Column("store_number", sa.INTEGER(), nullable=True),
        sa.Column("duration_data_store_id", sa.INTEGER(), nullable=True),
        sa.Column("index", sa.INTEGER(), nullable=True),
        sa.Column("data_commitment", sa.VARCHAR(), nullable=True),
        sa.Column("msg_hash", sa.VARCHAR(), nullable=True),
        sa.Column("init_time", postgresql.TIMESTAMP(), nullable=True),
        sa.Column("expire_time", postgresql.TIMESTAMP(), nullable=True),
        sa.Column("duration", sa.INTEGER(), nullable=True),
        sa.Column("store_period_length", sa.INTEGER(), nullable=True),
        sa.Column("fee", sa.INTEGER(), nullable=True),
        sa.Column("confirmer", sa.VARCHAR(), nullable=True),
        sa.Column("header", sa.VARCHAR(), nullable=True),
        sa.Column("init_tx_hash", sa.VARCHAR(), nullable=True),
        sa.Column("init_gas_used", sa.INTEGER(), nullable=True),
        sa.Column("init_block_number", sa.INTEGER(), nullable=True),
        sa.Column("confirmed", sa.BOOLEAN(), nullable=True),
        sa.Column("signatory_record", sa.VARCHAR(), nullable=True),
        sa.Column("confirm_tx_hash", sa.VARCHAR(), nullable=True),
        sa.Column("confirm_gas_used", sa.INTEGER(), nullable=True),
        sa.Column("batch_index", sa.INTEGER(), nullable=True),
        sa.Column("tx_count", sa.INTEGER(), nullable=True),
        sa.Column("block_count", sa.INTEGER(), nullable=True),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_table(
        "l1_state_batches",
        sa.Column("batch_index", sa.INTEGER(), nullable=False),
        sa.Column("previous_total_elements", sa.INTEGER(), nullable=True),
        sa.Column("batch_size", sa.INTEGER(), nullable=True),
        sa.Column("l1_block_number", sa.INTEGER(), nullable=True),
        sa.Column("l1_block_timestamp", postgresql.TIMESTAMP(), nullable=True),
        sa.Column("l1_block_hash", sa.VARCHAR(), nullable=True),
        sa.Column("l1_transaction_hash", sa.VARCHAR(), nullable=True),
        sa.Column("extra_data", sa.VARCHAR(), nullable=True),
        sa.Column("batch_root", sa.VARCHAR(), nullable=True),
        sa.PrimaryKeyConstraint("batch_index"),
    )
    op.create_table(
        "l1_to_l2_bridge_transactions",
        sa.Column("msg_hash", postgresql.BYTEA(), nullable=False),
        sa.Column("version", sa.INTEGER(), nullable=True),
        sa.Column("index", sa.INTEGER(), nullable=True),
        sa.Column("l1_block_number", sa.INTEGER(), nullable=True),
        sa.Column("l1_block_timestamp", postgresql.TIMESTAMP(), nullable=True),
        sa.Column("l1_block_hash", postgresql.BYTEA(), nullable=True),
        sa.Column("l1_transaction_hash", postgresql.BYTEA(), nullable=True),
        sa.Column("l1_from_address", postgresql.BYTEA(), nullable=True),
        sa.Column("l1_to_address", postgresql.BYTEA(), nullable=True),
        sa.Column("l2_block_number", sa.INTEGER(), nullable=True),
        sa.Column("l2_block_timestamp", postgresql.TIMESTAMP(), nullable=True),
        sa.Column("l2_block_hash", postgresql.BYTEA(), nullable=True),
        sa.Column("l2_transaction_hash", postgresql.BYTEA(), nullable=True),
        sa.Column("l2_from_address", postgresql.BYTEA(), nullable=True),
        sa.Column("l2_to_address", postgresql.BYTEA(), nullable=True),
        sa.Column("amount", sa.NUMERIC(precision=78), nullable=True),
        sa.Column("from_address", postgresql.BYTEA(), nullable=True),
        sa.Column("to_address", postgresql.BYTEA(), nullable=True),
        sa.Column("l1_token_address", postgresql.BYTEA(), nullable=True),
        sa.Column("l2_token_address", postgresql.BYTEA(), nullable=True),
        sa.Column("extra_info", postgresql.JSON(astext_type=sa.Text()), nullable=True),
        sa.Column("_type", sa.INTEGER(), nullable=True),
        sa.Column("sender", postgresql.BYTEA(), nullable=True),
        sa.Column("target", postgresql.BYTEA(), nullable=True),
        sa.Column("data", postgresql.BYTEA(), nullable=True),
        sa.PrimaryKeyConstraint("msg_hash"),
    )
    op.create_table(
        "l2_to_l1_bridge_transactions",
        sa.Column("msg_hash", postgresql.BYTEA(), nullable=False),
        sa.Column("version", sa.INTEGER(), nullable=True),
        sa.Column("index", sa.INTEGER(), nullable=True),
        sa.Column("l2_block_number", sa.INTEGER(), nullable=True),
        sa.Column("l2_block_timestamp", postgresql.TIMESTAMP(), nullable=True),
        sa.Column("l2_block_hash", postgresql.BYTEA(), nullable=True),
        sa.Column("l2_transaction_hash", postgresql.BYTEA(), nullable=True),
        sa.Column("l2_from_address", postgresql.BYTEA(), nullable=True),
        sa.Column("l2_to_address", postgresql.BYTEA(), nullable=True),
        sa.Column("l1_block_number", sa.INTEGER(), nullable=True),
        sa.Column("l1_block_timestamp", postgresql.TIMESTAMP(), nullable=True),
        sa.Column("l1_block_hash", postgresql.BYTEA(), nullable=True),
        sa.Column("l1_transaction_hash", postgresql.BYTEA(), nullable=True),
        sa.Column("l1_from_address", postgresql.BYTEA(), nullable=True),
        sa.Column("l1_to_address", postgresql.BYTEA(), nullable=True),
        sa.Column("amount", sa.NUMERIC(precision=78), nullable=True),
        sa.Column("from_address", postgresql.BYTEA(), nullable=True),
        sa.Column("to_address", postgresql.BYTEA(), nullable=True),
        sa.Column("l1_token_address", postgresql.BYTEA(), nullable=True),
        sa.Column("l2_token_address", postgresql.BYTEA(), nullable=True),
        sa.Column("extra_info", postgresql.JSON(astext_type=sa.Text()), nullable=True),
        sa.Column("_type", sa.INTEGER(), nullable=True),
        sa.Column("l1_proven_transaction_hash", postgresql.BYTEA(), nullable=True),
        sa.Column("l1_proven_block_number", sa.INTEGER(), nullable=True),
        sa.Column("l1_proven_block_timestamp", postgresql.TIMESTAMP(), nullable=True),
        sa.Column("l1_proven_block_hash", postgresql.BYTEA(), nullable=True),
        sa.Column("l1_proven_from_address", postgresql.BYTEA(), nullable=True),
        sa.Column("l1_proven_to_address", postgresql.BYTEA(), nullable=True),
        sa.PrimaryKeyConstraint("msg_hash"),
    )
    op.create_table(
        "linea_batches",
        sa.Column("number", sa.INTEGER(), nullable=False),
        sa.Column("verify_tx_hash", sa.VARCHAR(), nullable=True),
        sa.Column("verify_block_number", sa.INTEGER(), nullable=True),
        sa.Column("timestamp", postgresql.TIMESTAMP(), nullable=True),
        sa.Column("blocks", postgresql.ARRAY(sa.INTEGER()), nullable=True),
        sa.Column("transactions", postgresql.ARRAY(sa.VARCHAR()), nullable=True),
        sa.Column("last_finalized_block_number", sa.INTEGER(), nullable=True),
        sa.Column("tx_count", sa.INTEGER(), nullable=True),
        sa.Column("block_count", sa.INTEGER(), nullable=True),
        sa.PrimaryKeyConstraint("number"),
    )
    op.create_table(
        "mantle_batches",
        sa.Column("index", sa.INTEGER(), nullable=False),
        sa.Column("data_store_index", sa.INTEGER(), nullable=True),
        sa.Column("upgrade_data_store_id", sa.INTEGER(), nullable=True),
        sa.Column("data_store_id", sa.INTEGER(), nullable=True),
        sa.Column("status", sa.INTEGER(), nullable=True),
        sa.Column("confirm_at", postgresql.TIMESTAMP(), nullable=True),
        sa.PrimaryKeyConstraint("index"),
    )
    op.create_table(
        "op_bedrock_state_batches",
        sa.Column("batch_index", sa.INTEGER(), nullable=False),
        sa.Column("l1_block_number", sa.INTEGER(), nullable=True),
        sa.Column("l1_block_timestamp", postgresql.TIMESTAMP(), nullable=True),
        sa.Column("l1_block_hash", sa.VARCHAR(), nullable=True),
        sa.Column("l1_transaction_hash", sa.VARCHAR(), nullable=True),
        sa.Column("start_block_number", sa.INTEGER(), nullable=True),
        sa.Column("end_block_number", sa.INTEGER(), nullable=True),
        sa.Column("batch_root", sa.VARCHAR(), nullable=True),
        sa.Column("transaction_count", sa.INTEGER(), nullable=True),
        sa.Column("block_count", sa.INTEGER(), nullable=True),
        sa.PrimaryKeyConstraint("batch_index"),
    )
    op.create_table(
        "op_da_transactions",
        sa.Column("receipt_blob_gas_used", sa.INTEGER(), nullable=True),
        sa.Column("receipt_blob_gas_price", sa.NUMERIC(), nullable=True),
        sa.Column("blob_versioned_hashes", postgresql.ARRAY(sa.VARCHAR()), nullable=True),
        sa.Column("hash", sa.VARCHAR(), nullable=False),
        sa.Column("nonce", sa.INTEGER(), nullable=True),
        sa.Column("transaction_index", sa.INTEGER(), nullable=True),
        sa.Column("from_address", sa.VARCHAR(), nullable=True),
        sa.Column("to_address", sa.VARCHAR(), nullable=True),
        sa.Column("value", sa.NUMERIC(), nullable=True),
        sa.Column("gas", sa.INTEGER(), nullable=True),
        sa.Column("gas_price", sa.INTEGER(), nullable=True),
        sa.Column("input", sa.VARCHAR(), nullable=True),
        sa.Column("receipt_cumulative_gas_used", sa.INTEGER(), nullable=True),
        sa.Column("receipt_gas_used", sa.INTEGER(), nullable=True),
        sa.Column("receipt_contract_address", sa.VARCHAR(), nullable=True),
        sa.Column("receipt_root", sa.VARCHAR(), nullable=True),
        sa.Column("receipt_status", sa.INTEGER(), nullable=True),
        sa.Column("block_timestamp", postgresql.TIMESTAMP(), nullable=True),
        sa.Column("block_number", sa.INTEGER(), nullable=True),
        sa.Column("block_hash", sa.VARCHAR(), nullable=True),
        sa.Column("max_fee_per_gas", sa.INTEGER(), nullable=True),
        sa.Column("max_priority_fee_per_gas", sa.INTEGER(), nullable=True),
        sa.Column("transaction_type", sa.INTEGER(), nullable=True),
        sa.Column("receipt_effective_gas_price", sa.INTEGER(), nullable=True),
        sa.PrimaryKeyConstraint("hash"),
    )
    op.create_table(
        "zkevm_batches",
        sa.Column("batch_index", sa.INTEGER(), nullable=False),
        sa.Column("coinbase", sa.VARCHAR(), nullable=True),
        sa.Column("state_root", sa.VARCHAR(), nullable=True),
        sa.Column("global_exit_root", sa.VARCHAR(), nullable=True),
        sa.Column("mainnet_exit_root", sa.VARCHAR(), nullable=True),
        sa.Column("rollup_exit_root", sa.VARCHAR(), nullable=True),
        sa.Column("local_exit_root", sa.VARCHAR(), nullable=True),
        sa.Column("acc_input_hash", sa.VARCHAR(), nullable=True),
        sa.Column("timestamp", postgresql.TIMESTAMP(), nullable=True),
        sa.Column("transactions", postgresql.ARRAY(sa.VARCHAR()), nullable=True),
        sa.Column("blocks", postgresql.ARRAY(sa.INTEGER()), nullable=True),
        sa.Column("start_block_number", sa.INTEGER(), nullable=True),
        sa.Column("end_block_number", sa.INTEGER(), nullable=True),
        sa.Column("block_count", sa.INTEGER(), nullable=True),
        sa.Column("transaction_count", sa.INTEGER(), nullable=True),
        sa.Column("sequence_batch_tx_hash", sa.VARCHAR(), nullable=True),
        sa.Column("sequence_batch_block_number", sa.INTEGER(), nullable=True),
        sa.Column("sequence_batch_block_timestamp", postgresql.TIMESTAMP(), nullable=True),
        sa.Column("verify_batch_tx_hash", sa.VARCHAR(), nullable=True),
        sa.Column("verify_batch_block_number", sa.INTEGER(), nullable=True),
        sa.Column("verify_batch_block_timestamp", postgresql.TIMESTAMP(), nullable=True),
        sa.Column("number", sa.INTEGER(), nullable=True),
        sa.Column("send_sequences_tx_hash", sa.VARCHAR(), nullable=True),
        sa.PrimaryKeyConstraint("batch_index"),
    )
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table("zkevm_batches")
    op.drop_table("op_da_transactions")
    op.drop_table("op_bedrock_state_batches")
    op.drop_table("mantle_batches")
    op.drop_table("linea_batches")
    op.drop_table("l2_to_l1_bridge_transactions")
    op.drop_table("l1_to_l2_bridge_transactions")
    op.drop_table("l1_state_batches")
    op.drop_table("data_stores")
    op.drop_table("data_store_tx_mapping")
    op.drop_table("bridge_tokens")
    op.drop_table("arbitrum_transaction_batches")
    op.drop_table("arbitrum_state_batches")
    # ### end Alembic commands ###