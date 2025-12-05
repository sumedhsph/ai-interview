"use client";
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import InterviewConfig from './page';
//import { useInterviewStore } from '@/store/useInterviewStore';

describe('Interview Config Form - Role Select', () => {
  it('renders select menu with all roles', () => {
    render(<InterviewConfig />);

    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();

    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(4); // Assuming 4 roles as per store

    expect(screen.getByText('Frontend Developer')).toBeInTheDocument();
    expect(screen.getByText('Backend Developer')).toBeInTheDocument();
    expect(screen.getByText('React Developer')).toBeInTheDocument();
  });

  it('has Frontend Developer selected by default', () => {
    render(<InterviewConfig />);
    const select = screen.getByRole('combobox') as HTMLSelectElement;
    const expButtons = screen.getAllByRole('experience');
    expect(select.value).toBe('Frontend Developer');
    expect(expButtons.length).toBe(4);
    expButtons.forEach((button) => {
      expect(button).toBeInTheDocument();
      expect(button).toHaveAttribute('role', 'experience');
      expect(button).toHaveTextContent(/[\d+-]+/);
    });

  });
});